import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import react from 'react';

export default {
  input: 'dist/esm/index.js',
  output: {
    file: 'dist/ionic-react-hooks.js',
    format: 'iife',
    name: 'ionicReactHooks',
    sourcemap: true,
    banner: '/*! Ionic React Hooks: https://ionicframework.com/ - MIT Licensed */',
    globals: {
      'react': 'React'
    }
  },
  external: id => /^react|styled-jsx/.test(id),
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react)
      }
    })
  ]
};
