const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const tokenCut = req.headers.authorization.substring(7);
      const decodedToken = jwt.verify(tokenCut, process.env.SECRET_KEY);

      res.locals.decodedToken = decodedToken;
      next();
    } else {
      throw { message: "You do not have the right permission for this." };
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  jwtMiddleware,
};
