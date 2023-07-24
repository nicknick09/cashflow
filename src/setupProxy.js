const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/CashForecasting/api',
    createProxyMiddleware({
      target: "http://66.85.137.50:5050/CashForecasting",
      changeOrigin: true
    })
  );
};
