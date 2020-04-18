
const fs = require('fs');
const proxy = require("http-proxy-middleware");

const targetOption = {
  protocol: 'https:',
  port: 443,
  cert: fs.readFileSync(process.env.DEV_CERT_PEM),
  key: fs.readFileSync(process.env.DEV_CERT_PEM),
  ca: fs.readFileSync(process.env.CA_BUNDLE)
};

const activitiesMap = { //the values here should come from config, are code should not know about environments
  passportControl: "passport-control.int.tools.bbc.co.uk",
  imageUpload: "image-upload-activity.int.tools.bbc.co.uk",
  av: "av-activity.int.tools.bbc.co.uk",
  hd: 'castaway.int.tools.bbc.co.uk'
};

const getActivityRoute = (req) => {
  const activityKey = req.path ? req.path.split("/")[2] : null; //todo - make this less crap
  if (activityKey in activitiesMap) return { ...targetOption, ...{ host: activitiesMap[activityKey] } };
};

const proxyOptions = {
  target: `https://passport-control.int.tools.bbc.co.uk`, // what is the point of this in thr presence of a router? do we fall back
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
