// // utils/generateToken.js

// const jwt = require('jsonwebtoken');

// const generateToken = (userID) => {
//     // Ensure userID is wrapped in an object
//     const payload = { id: userID };
    
//     const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
//         expiresIn: "10d"
//     });

//     // // Set the token in a cookie
//     // res.cookie('token', token, {
//     //     httpOnly: true,
//     //     secure: process.env.NODE_ENV !== 'development',
//     //     // sameSite: 'strict',
//     //     maxAge: 86400000, // 1 day
//     // });

//     return token; 
// };

// module.exports = generateToken;

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  if (!userId) {
    throw new Error('User ID is required to generate token');
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d', // Token expiration time
  });
};

module.exports = generateToken;
