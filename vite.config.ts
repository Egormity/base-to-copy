import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// @ts-expect-error EXPLICITLY ANY TYPE PROBLEM
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
