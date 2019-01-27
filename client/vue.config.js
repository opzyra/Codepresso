const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const routesPrerender = require('./prerender.config')
const routesBasic = ['/home', '/portfolio', '/devlog']

const config = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: routesBasic.concat(routesPrerender),
        renderAfterTime: 5000,
        renderAfterElementExists: '#app'
      }),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
}

module.exports = config
