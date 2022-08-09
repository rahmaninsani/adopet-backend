const sequelize = require('sequelize');

const binToUUID = (col, swapFlag) => {
  return sequelize.fn('BIN_TO_UUID', sequelize.col(col), swapFlag);
};

const uuidToBin = (value, swapFlag) => {
  return sequelize.fn('UUID_TO_BIN', value, swapFlag);
};
module.exports = {
  binToUUID,
  uuidToBin,
};
