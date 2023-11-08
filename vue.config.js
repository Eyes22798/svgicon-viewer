const yargs = require('yargs')
const SvgIconConfig = require('@eyes22798/svg-icon/webpack')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const svgPath = yargs.argv.path || './assets'

module.exports = {
  outputDir: '../dist',
  chainWebpack: (config) => {
    SvgIconConfig({ config, iconPath: svgPath, name: 'svg-icon' })

    config
      .plugin('polyfill')
      .use(NodePolyfillPlugin)
  },
}
