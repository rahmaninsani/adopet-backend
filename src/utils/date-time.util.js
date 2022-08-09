const moment = require('moment');
const dateFormat = 'YYYY-MM-DD';
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

const todayDate = () => moment().format(dateFormat);

module.exports = {
  todayDate,
};
