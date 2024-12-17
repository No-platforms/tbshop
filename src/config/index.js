require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  ADMIN_USER_ID: process.env.ADMIN_USER_ID,
  PORT: process.env.PORT || 3000
};