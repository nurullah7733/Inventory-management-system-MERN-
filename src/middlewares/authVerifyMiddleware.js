const jwt = require("jsonwebtoken");

const authVerifyMiddleware = (req, res, next) => {
  let token = req.headers.token;

  jwt.verify(token, process.env.SECRET_KEY, (e, decode) => {
    if (e) {
      return res.status(401).json({ status: "unauthorized" });
    } else {
      req.headers.email = decode["data"];
      next();
    }
  });
};

module.exports = authVerifyMiddleware;
