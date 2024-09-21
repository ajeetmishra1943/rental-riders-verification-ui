/// <reference types="vitest" />
import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config



export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    base: env.VITE_ROUTER_BASE_URL || '/',
    define: ({
      'process.env' : env
    }),
}
  )
}


// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  //   setupFiles: '.vitest/setup',
  //   include: ['**/test.{ts,tsx}']
  // }
// })
