import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory
	// For example: .env.development, .env.production
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: env.VITE_BACKEND_URL,
					changeOrigin: true,
				}
			}
		}
	}
});
