
const fs = require('fs');
const proxy = require("http-proxy-middleware");

const activitiesMap = {
  passportControl: "https://passport-control.int.tools.bbc.co.uk/graphql",
  imageUpload: "https://image-upload-activity.int.tools.bbc.co.uk/",
  av: "https://av-activity.int.tools.bbc.co.uk",
  hd: {
      protocol: 'https',
      host: 'castaway.int.tools.bbc.co.uk/status',
      port: 443,
      pfx: fs.readFileSync(process.env.DEV_CERT_P12),
      passphrase: process.env.CERT_PASSPHRASE,
      ca: process.env.CA_BUNDLE
  }
};

const getActivityRoute = (req) => {
  const activityKey = req.path ? req.path.split("/")[2] : null;
  return activitiesMap[activityKey];
};

const proxyOptions = {
  target: {
    protocol: 'https',
    host: 'example.org',
    port: 443,
    pfx: fs.readFileSync(process.env.DEV_CERT_P12),
    passphrase: process.env.CERT_PASSPHRASE,
    ca: process.env.COSMOS_CA
  } ,
  changeOrigin: true,
  pathRewrite: {
    "^/_activities/[a-zA-Z]+/": "/",
  },
  router: getActivityRoute,
};

function getProxyMiddleware(ssl = {}) {
  return proxy(proxyOptions);
}
module.exports = {
  getProxyMiddleware,
};
