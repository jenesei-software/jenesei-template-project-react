import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import path from 'path'
import process from 'process'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('mode', mode)
  const VITE_DEFAULT_NAME = env.VITE_DEFAULT_NAME || 'Default App Name'
  const VITE_DEFAULT_SHORTNAME = env.VITE_DEFAULT_SHORTNAME || 'Default Shortname'
  const VITE_DEFAULT_THEME_COLOR = env.VITE_DEFAULT_THEME_COLOR || '#ffffff'
  const VITE_DEFAULT_DESCRIPTION = env.VITE_DEFAULT_DESCRIPTION || 'Default Description'

  return {
    server: {
      host: 'local.dev.jenesei.ru',
      port: 2000
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
            if (id.includes('src/pages')) {
              const page = id.split('src/pages/')[1].split('/')[0]
              return `page-${page}`
            }
            if (id.includes('src/layouts')) {
              const layout = id.split('src/layouts/')[1].split('/')[0]
              return `layout-${layout}`
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@local': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      react(),
      basicSsl(),
      VitePWA({
        strategies: 'generateSW',
        registerType: 'autoUpdate',
        includeManifestIcons: false,
        injectRegister: false,
        workbox: {
          globPatterns: [], // Не кэшируем никакие файлы
          maximumFileSizeToCacheInBytes: 0 // Устанавливаем лимит в 0 байт
        },
        manifest: {
          display: 'standalone',
          orientation: 'portrait',
          name: VITE_DEFAULT_NAME,
          short_name: VITE_DEFAULT_SHORTNAME,
          theme_color: VITE_DEFAULT_THEME_COLOR,
          background_color: VITE_DEFAULT_THEME_COLOR,
          description: VITE_DEFAULT_DESCRIPTION,
          start_url: '/',
          icons: [
            {
              src: 'icons/icon-64x64.ico',
              sizes: '64x64',
              type: 'image/x-icon',
              purpose: 'any'
            },
            {
              src: 'icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-256x256.png',
              sizes: '256x256',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-180x180.png',
              sizes: '180x180',
              type: 'image/png',
              purpose: 'any'
            }
          ]
        }
      })
    ]
  }
})
