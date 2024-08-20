/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
	  return [
		{
		  source: '/api/auth/:path*',
		  destination: 'http://localhost:4000/api/auth/:path*',
		},
	  ]
	},
  };

  export default nextConfig;
