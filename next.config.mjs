/** @type {import('next').NextConfig} */
const nextConfig = {
  // As imagens já são servidas em WebP no tamanho certo (public/), por isso
  // não precisam do otimizador do Next — o site funciona em qualquer alojamento
  // estático.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
