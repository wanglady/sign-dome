module.exports = {
  outputDir: 'demo',
  publicPath: '/demo',
  configureWebpack: {
    externals: {},
  },
  devServer: {
    port: 8080,
    // open: true, //是否自动启动浏览器
    proxy: {
      '/test': {
        target: 'http://0.0.0.0:8083/seal',
        changeOrigin: true,
        pathRewrite: {
          '^/test': '/test',
        },
      },
      '/V': {
        target: 'http://0.0.0.0:8800',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/',
        },
      },
    },
  },
}
