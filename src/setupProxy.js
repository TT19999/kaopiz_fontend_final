const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://whispering-escarpment-70299.herokuapp.com/',
      changeOrigin: true,
    })
  );
};