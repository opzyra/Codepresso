const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const axios = require('axios')
let routes = ['/home', '/portfolio', '/devlog']
axios.get('https://www.codepresso.net/api/info/devlog/count').then(res => {
  for (let i = 1; i <= res.data.topic; i++) {
    routes.push(`/devlog/topic/${i}`)
  }
  for (let i = 1; i <= res.data.feed; i++) {
    routes.push(`/devlog/feed/${i}`)
  }
})

const config = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: routes,
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
