
const fs = require('fs');
const proxy = require("http-proxy-middleware");

const targetOption = {
  protocol: 'https:',
  host: 'castaway.int.tools.bbc.co.uk',
  port: 443,
  cert: fs.readFileSync(process.env.DEV_CERT_PEM),
  key: fs.readFileSync(process.env.DEV_CERT_PEM),
  ca: fs.readFileSync(process.env.CA_BUNDLE)
};

const activitiesMap = {
  passportControl: "https://passport-control.int.tools.bbc.co.uk/graphql",
  imageUpload: "https://image-upload-activity.int.tools.bbc.co.uk/",
  av: "https://av-activity.int.tools.bbc.co.uk",
  hd: targetOption
};

const getActivityRoute = (req) => {
  const activityKey = req.path ? req.path.split("/")[2] : null;
  return activitiesMap[activityKey];
};

const proxyOptions = {
  target: `https://passport-control.int.tools.bbc.co.uk`,
  changeOrigin: true,
  pathRewrite: {
    "^/_activities/[a-zA-Z]+/": "/",
  },
  router: getActivityRoute,
  onProxyReq: (proxyReq) => console.log('meh')
};

function getProxyMiddleware(ssl = {}) {
  return proxy(proxyOptions);
}
module.exports = {
  getProxyMiddleware,
};
