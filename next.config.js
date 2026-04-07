/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'react-markdown',
    'remark-gfm',
    'rehype-raw',
    'remark-parse',
    'unified',
    'bail',
    'is-plain-obj',
    'trough',
    'vfile',
    'unist-util-stringify-position',
  ],
}

module.exports = nextConfig
