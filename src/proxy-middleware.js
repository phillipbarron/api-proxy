var proxy = require("http-proxy-middleware");

const activitiesMap = {
  passportControl: "https://passport-control.int.tools.bbc.co.uk/graphql",
  imageUpload: "https://image-upload-activity.int.tools.bbc.co.uk/",
  av: "https://av-activity.int.tools.bbc.co.uk",
};

const getActivityRoute = (req) => {
  const activityKey = req.path ? req.path.split("/")[2] : null;
  return activitiesMap[activityKey];
};

const proxyOptions = {
  target: "http://example.com",
  changeOrigin: true,
  pathRewrite: {
    "^/_activities/[a-zA-Z]+/": "/",
  },
  router: getActivityRoute,
};

function getProxyMiddleware() {
  return proxy(proxyOptions);
}
module.exports = {
  getProxyMiddleware,
};
