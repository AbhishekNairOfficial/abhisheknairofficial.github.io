/* config-overrides.js */
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = function override(config) {
  // eslint-disable-next-line no-param-reassign
  config.plugins = config.plugins.map(plugin => {
    if (plugin.constructor.name === 'GenerateSW') {
      return new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/custom-service-worker.js',
        swDest: 'service-worker.js',
      });
    }

    return plugin;
  });
  return config;
};
