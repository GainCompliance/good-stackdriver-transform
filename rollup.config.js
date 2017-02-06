/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/transform.js',
  external: [
    'stream'
  ],
  plugins: [
    babel({
      babelrc: false,
      exclude: ['./node_modules/**'],
      presets: ['es2015-rollup']
    })
  ],
  targets: [
    {dest: 'lib/transform.cjs.js', format: 'cjs'},
    {dest: 'lib/transform.es.js', format: 'es'}
  ]
};
