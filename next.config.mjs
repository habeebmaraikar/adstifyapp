/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  // Enables React's Strict Mode for highlighting potential problems
    swcMinify: true,  // Uses SWC for faster builds and smaller output sizes
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'static01.nyt.com',
          pathname: '/images/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.worldweatheronline.com',
          pathname: '/images/**',
        },
        {
          protocol: 'https',
          hostname: 'assets.weatherstack.com',
          pathname: '/images/**',
        },
        {
            protocol: 'https',
            hostname: '**',  // Allow all domains
        },
      ],
    },
    env: {
      NYTIMES_API_KEY: process.env.NYTIMES_API_KEY,  // Use environment variables securely
      WEATHER_API_KEY: process.env.WEATHER_API_KEY,  //
    },
    webpack: (config) => {
      config.cache = false; // Disable caching for now
      return config;
    },
  };
  
  export default nextConfig;
  
  