const debugService = require("debug-level").log("cookies");

let cookieObj = {};

module.exports = {
  countCookie: (req, res, next) => {
    if (req.signedCookies) {
      Object.entries(req.signedCookies).forEach(([name, value]) => {
        debugService.debug(`Cookie Name: ${name}`);
        debugService.debug(`Cookie Value: ${value}`);

        if (name in cookieObj) {
          cookieObj[name] += 1;
        } else {
          cookieObj[name] = 1;
        }

        debugService.info(`count: ${JSON.stringify(cookieObj)}`);
      });
    }
    next();
  },
};
