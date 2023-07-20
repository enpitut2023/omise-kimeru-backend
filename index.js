const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const simpleRequestLogger = (proxyServer, options) => {
  proxyServer.on('proxyReq', (proxyReq, req, res) => {
    console.log(`[HPM] [${req.method}] ${req.url}`); // outputs: [HPM] GET /users
  });
}

const app = express();
app.use(cors())

app.use(
  '/proxy',
  createProxyMiddleware({
    target: 'https://webservice.recruit.co.jp',
    changeOrigin: true,
    plugins: [simpleRequestLogger],
  })
);

app.listen(3001);
