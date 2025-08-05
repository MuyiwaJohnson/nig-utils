import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'telco/index': 'src/telco/index.ts',
    'geo/index': 'src/geo/index.ts',
    'money/index': 'src/money/index.ts',
    'generators/index': 'src/generators/index.ts'
  },
  format: ['cjs', 'esm'],
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: false,
  external: [],
  dts: {
    resolve: true,
    compilerOptions: {
      removeComments: true
    }
  },
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    }
  },
  noExternal: [],
  target: 'es2020'
})
