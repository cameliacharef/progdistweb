const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 8081;

app.use('/rooms', createProxyMiddleware({ target: 'http://room-service:8080', changeOrigin: true, pathRewrite: {'^/rooms': ''} }));
app.use('/bookings', createProxyMiddleware({ target: 'http://booking-service:8000', changeOrigin: true, pathRewrite: {'^/bookings': ''} }));
app.use('/users', createProxyMiddleware({ target: 'http://user-service:3000', changeOrigin: true, pathRewrite: {'^/users': ''} }));

app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => console.log(`API Gateway listening on ${port}`));
