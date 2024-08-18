import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import { transformerNotationDiff } from '@shikijs/transformers';

import { defineConfig } from 'astro/config';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeToc from 'rehype-toc';

import vercel from '@astrojs/vercel/serverless';

/** @type {import('rehype-pretty-code').Options} */
const options = {
  filterMetaString: (string) => string.replace(/filename="[^"]*"/, ''),
  transformers: [
    transformerNotationDiff(),
    transformerCopyButton({
      visibility: 'hover',
      feedbackDuration: 2_500,
    }),
  ],
  theme: {
    dark: 'catppuccin-mocha',
    light: 'catppuccin-latte',
  },
};
// https://astro.build/config
export default defineConfig({
  site: 'https://blog-gilt-tau-28.vercel.app/',
  integrations: [mdx(), sitemap(), tailwind(), react()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypePrettyCode, options],
      [
        rehypeToc,
        {
          headings: ['h1', 'h2', 'h3'],
          cssClasses: {
            toc: 'toc-post',
            link: 'toc-link',
          },
        },
      ],
    ],
  },
  output: 'server',
  adapter: vercel(),
});
