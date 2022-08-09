const bcrypt = require('bcrypt');
const saltRounds = 12;

/**
 *
 * @param {string} plainText plain text password
 * @returns {Promise<string>} hashed password
 */
const hash = async (plainText) => await bcrypt.hash(plainText, saltRounds);

/**
 *
 * @param {string} plainText plain text password
 * @param {string} hashedPassword hashed password
 * @returns {Promise<boolean>} true if plain text password is same with hashed password
 */
const compare = async (plainText, hashedPassword) => await bcrypt.compare(plainText, hashedPassword);

module.exports = {
  hash,
  compare,
};
