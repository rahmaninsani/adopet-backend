const { verifyAccessToken } = require('../utils');

const isAuthenticated = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        code: res.statusCode,
        status: 'Unauthorized',
      });
    }

    const accessToken = authorization.split(' ')[1];
    verifyAccessToken(accessToken, (error, decodedUser) => {
      if (error) {
        return res.status(403).json({
          code: res.statusCode,
          status: 'Forbidden',
        });
      }

      req.user = decodedUser;
      next();
    });
  } catch (error) {
    res.sendStatus(500).end();
  }
};

module.exports = {
  isAuthenticated,
};
