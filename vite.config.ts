/// <reference types="vitest" />
import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config



export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const sanitizeKey = (key) => key.replace(/\W/g, '_')

  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      // Sanitize the key and add it to the object
      return {
        ...prev,
        [`process.env.${sanitizeKey(key)}`]: JSON.stringify(val)
      }
    },
    {}
  )

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    base: env.VITE_ROUTER_BASE_URL || '/',
    define: envWithProcessPrefix,
    // Add this to prevent Vite from trying to handle process.env
    resolve: {
      alias: {
        'process.env': JSON.stringify({}),
      },
    },
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
