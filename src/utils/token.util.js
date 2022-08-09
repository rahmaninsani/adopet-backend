const jwt = require('jsonwebtoken');
const accessSecret = process.env.ACCESS_SECRET || '$AcCeSs-sEcReT$';

const generateAccessToken = ({ name, email }) => {
  const data = { name, email };
  return jwt.sign(data, accessSecret);
};

const verifyAccessToken = (accessToken, done) => {
  const options = (error, decodedUser) => {
    return error ? done(Error) : done(null, decodedUser);
  };

  return jwt.verify(accessToken, accessSecret, options);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
