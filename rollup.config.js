import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'dist/esm/index.js',
  output: [
    {
      name: 'ionicReactHooks',
      banner: '/*! Ionic React Hooks: https://ionicframework.com/ - MIT Licensed */',
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      name: 'ionicReactHooks',
      banner: '/*! Ionic React Hooks: https://ionicframework.com/ - MIT Licensed */',
      file: 'dist/index.js',
      format: 'commonjs',
      preferConst: true,
      sourcemap: true
    }
  ],
  external: (id) => !/^(\.|\/)/.test(id),
  plugins: [
    resolve(),
    sourcemaps()
  ]
};
