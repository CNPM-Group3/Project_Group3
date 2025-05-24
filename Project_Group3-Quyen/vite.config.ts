import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Kiểm tra và fallback nếu biến env chưa có
  const appName = env.VITE_APP_NAME ? env.VITE_APP_NAME.toLowerCase() : 'defaultapp';
  const nodeEnv = env.VITE_NODE_ENV || 'development';
  const serverUrl = env.VITE_SERVER_URL || 'http://localhost:4200';
  const apiUrl = env.VITE_API_URL || 'http://localhost:3000/api';

  const isProd = nodeEnv === 'production';

  let parsedServerUrl;
  try {
    parsedServerUrl = new URL(serverUrl);
  } catch {
    parsedServerUrl = new URL('http://localhost:4200');
  }

  return {
    root: __dirname,
    cacheDir: `./node_modules/.vite/${appName}`,
    server: {
      port: Number(parsedServerUrl.port) || 4200,
      host: parsedServerUrl.hostname || 'localhost',
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: isProd,
        }
      }
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    resolve: {
      alias: {
        '@cnpm': path.resolve(__dirname, 'src'),
        '@i18n': path.resolve(__dirname, 'src/i18n'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    build: {
      outDir: `./dist/${appName}`,
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      sourcemap: !isProd,
      minify: isProd,
    },
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: `./coverage/${appName}`,
        provider: 'v8',
      },
    },
    define: {
      'process.env': env
    }
  };
});