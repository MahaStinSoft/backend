// require('dotenv').config();

// module.exports = {
//   BASE_URL: '/api',
//   DB_URI: process.env.MONGO_URI,
//   DB_NAME: 'flutter_demo', // You can use the environment variable here if you prefer
//   JWT_SECRET: process.env.JWT_SECRET_KEY,
// };



// config/config.js
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || '/api';

module.exports = {
  BASE_URL
};
