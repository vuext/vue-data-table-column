const { version } = require('./package');

const banner = `/**
 * vue-data-table-column v${version}
 * (c) 2019-present Vue Extensions
 * https://github.com/vuext/vue-data-table-column
 * Released under the MIT License.
 */
`;

module.exports = {
  banner,
  output: {
    fileName: (context, defaultFileName) => {
      if (context.format === 'umd' || context.format === 'umd-min') {
        return 'vue-data-table-column[min].js';
      }
      return 'vue-data-table-column.[format].js';
    },
    moduleName: 'vue-data-table-column',
    format: [
      'cjs',
      'es',
      'umd',
      'umd-min',
    ],
  },
  plugins: {
    commonjs: true,
    vue: {
      css: false,
    },
  },
  bundleNodeModules: true,
};
