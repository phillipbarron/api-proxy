var proxy = require('http-proxy-middleware');

function getProxyMiddleware() {
    return proxy({ target: 'https://passport-control.int.tools.bbc.co.uk', changeOrigin: true });
}
 module.exports = {
     getProxyMiddleware
 }
