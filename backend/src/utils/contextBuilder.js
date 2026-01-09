import logger from "./logger.js"
const contextBuilder = (req) => {
  return {
    user: req.user || null,
    request: {
      method: req.method,
      path: req.originalUrl
    },
    logger: logger,
    meta: {
      ip: req.ip || null,
      userAgent: req.headers["user-agent"]
    }
  };
};

export default contextBuilder;