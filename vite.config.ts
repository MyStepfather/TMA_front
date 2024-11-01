import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: '/src/components',
			helpers: '/src/helpers',
			hooks: '/src/hooks',
			interfaces: '/src/interfaces',
			layout: '/src/layout',
			pages: '/src/pages',
			services: '/src/services'
		}
	}
});
