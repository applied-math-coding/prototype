module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true
      },
      '/graph-api': {
        target: 'http://localhost:3000'
      }
    }
  }
}
