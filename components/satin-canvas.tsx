"use client";

import { useEffect, useRef, useState } from "react";

/*
  Elemento assinatura do site: um tecido acetinado em rosa pálido, desenhado
  em WebGL, com dobras que se movem devagar e que se afastam do cursor.

  Decisões:
  - WebGL simples em vez de three.js: o efeito é um único shader, não precisa
    de ~150 KB de biblioteca.
  - O contentor mostra sempre uma imagem estática do tecido (satin-poster.webp,
    2 KB). O canvas aparece por cima, com fade, só depois do 1.º frame.
  - O WebGL só arranca quando o browser está livre (requestIdleCallback),
    para não atrasar o primeiro ecrã.
  - Fica só a imagem estática quando: não há WebGL, o WebGL corre por software
    (sem placa gráfica, o shader bloquearia o processador) ou o sistema pede
    "reduzir movimento".
  - Desenha a metade da resolução e a ~30 fps: o tecido é desfocado por
    natureza, não perde qualidade, e o custo por frame cai para ~1/4.
  - Pausa quando sai do ecrã ou quando o separador fica oculto.
*/

const VERTEX = `attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;

const FRAGMENT = `precision highp float;
varying vec2 uv;
uniform float t;
uniform vec2 res;
uniform vec2 m;
uniform float hover;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.02+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 p=uv; p.x*=res.x/res.y;
  vec2 mm=m; mm.x*=res.x/res.y;
  float tt=t*.06;
  vec2 d=p-mm; float r=length(d);
  p+=normalize(d+1e-4)*(.10*hover)*exp(-r*r*7.);
  vec2 q=vec2(fbm(p*.9+tt),fbm(p*.9-tt+3.1));
  vec2 w=p+.55*q;
  float f1=sin(w.x*5.5+w.y*2.6+fbm(w*1.6+tt)*4.);
  float f2=sin(w.x*-2.4+w.y*4.2+fbm(w*1.2-tt+5.)*3.);
  float folds=f1*.65+f2*.35;
  float shade=.5+.5*folds;
  float spec=pow(max(0.,folds),6.);
  vec3 base=vec3(.992,.972,.978);
  vec3 mid=vec3(.972,.874,.906);
  vec3 deep=vec3(.925,.735,.8);
  vec3 col=mix(deep,mid,smoothstep(.05,.5,shade));
  col=mix(col,base,smoothstep(.5,.95,shade));
  col+=spec*.12;
  col+=(h(uv*res+t)-.5)*.018;
  gl_FragColor=vec4(col,1.);
}`;

export default function SatinCanvas({
  pauseLabel,
  playLabel,
}: {
  pauseLabel: string;
  playLabel: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  // Movimento contínuo com mais de 5 s precisa de um controlo para parar (WCAG 2.2.2).
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};

    const init = () => {
      const gl = canvas.getContext("webgl", { antialias: false });
      if (!gl) return;

      // Sem placa gráfica? Fica a imagem estática.
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
      if (/swiftshader|llvmpipe|software/i.test(renderer)) return;

      const compile = (type: number, src: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
      };
      const vs = compile(gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
      if (!vs || !fs) return;

      const program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const u = {
        t: gl.getUniformLocation(program, "t"),
        res: gl.getUniformLocation(program, "res"),
        m: gl.getUniformLocation(program, "m"),
        hover: gl.getUniformLocation(program, "hover"),
      };

      const RENDER_SCALE = 0.5;
      const FRAME_MS = 1000 / 30;
      const start = performance.now();
      const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, h: 0, th: 0 };
      let visible = true;
      let raf = 0;
      let last = 0;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2) * RENDER_SCALE;
        const r = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.round(r.width * dpr));
        canvas.height = Math.max(1, Math.round(r.height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      const draw = () => {
        // Suaviza o movimento do cursor para o tecido não "saltar".
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;
        mouse.h += (mouse.th - mouse.h) * 0.05;
        gl.uniform1f(u.t, (performance.now() - start) / 1000);
        gl.uniform2f(u.res, canvas.width, canvas.height);
        gl.uniform2f(u.m, mouse.x, mouse.y);
        gl.uniform1f(u.hover, mouse.h);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const loop = (now: number) => {
        if (visible && !pausedRef.current && !document.hidden && now - last >= FRAME_MS) {
          last = now;
          draw();
        }
        raf = requestAnimationFrame(loop);
      };

      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        mouse.tx = (e.clientX - r.left) / r.width;
        mouse.ty = 1 - (e.clientY - r.top) / r.height;
        mouse.th = 1;
      };
      const onLeave = () => {
        mouse.th = 0;
      };

      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(host);
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);

      resize();
      draw();
      setReady(true);
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      };
    };

    const w = window as Window & typeof globalThis;
    const idle =
      typeof w.requestIdleCallback === "function"
        ? w.requestIdleCallback(init, { timeout: 2000 })
        : w.setTimeout(init, 800);

    return () => {
      if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idle);
      w.clearTimeout(idle);
      cleanup();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      {ready && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? playLabel : pauseLabel}
          aria-pressed={paused}
          className="absolute bottom-3 right-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-paper/80 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-paper"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            {paused ? (
              <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
            ) : (
              <path d="M3 1.5v9M9 1.5v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      )}
    </>
  );
}
