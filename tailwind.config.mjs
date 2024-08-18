import { components, palette, palettes, rounded, shade } from '@tailus/themer';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@tailus/themer/dist/components/**/*.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...palettes.winter,
        primary: {
          50: '#fdf4f3',
          100: '#fce7e8',
          200: '#f9d2d5',
          300: '#f3aeb2',
          400: '#ec808a',
          500: '#e05363',
          600: '#c43149',
          700: '#ab253e',
          800: '#8f223a',
          900: '#7b2037',
          950: '#440d19',
        },
      },
      fontFamily: {
        sans: ['Geist Sans', ...defaultTheme.fontFamily.sans],
        mono: ['Geist Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [components, palette, palettes, rounded, shade, require('@tailwindcss/typography')],
};
