
const fs = require('fs');
const proxy = require("http-proxy-middleware");

const targetOption = {
  protocol: 'https:',
  port: 443,
  cert: fs.readFileSync(process.env.DEV_CERT_PEM),
  key: fs.readFileSync(process.env.DEV_CERT_PEM),
  ca: fs.readFileSync(process.env.CA_BUNDLE)
};

const camelToUnderscore = (key) => key.replace( /([A-Z])/g, "_$1").toUpperCase();

const getActivityRoute = (req) => {
  const activityKey = req.path ? camelToUnderscore(req.path.split("/")[2]) : null; //todo - make this less crap
  if (process.env[activityKey]) return { ...targetOption, ...{ host: process.env[activityKey] } };
};

const proxyOptions = {
  target: `https://passport-control.int.tools.bbc.co.uk`, // fall back where router does not return anything
  changeOrigin: true,
  pathRewrite: {
    "^/_activities/[a-zA-Z]+/": "/",
  },
  router: getActivityRoute,
  onProxyReq: (proxyReq) => console.log('meh')
};

function getProxyMiddleware() {
  return proxy(proxyOptions);
}
module.exports = {
  getProxyMiddleware,
};
