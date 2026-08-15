import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'clsx',
      '@headlessui/react',
      'lucide-react',
      'motion',
      'canvas-confetti',
      'tiny-invariant',
      'isbot',
      'react-intersection-observer',
      'react-use',
    ],
  },
  build: {
    assetsInlineLimit: 0,
  },
});
