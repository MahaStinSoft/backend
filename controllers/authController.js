// // // controllers/authController.js

// // const { connectToDatabase } = require('../middlewares/database'); // Adjust path as needed
// // const generateToken = require('../utils/generateToken');

// // const login = async (req, res) => {
// //   const { email, password } = req.body;
// //   console.log('Received login request with:', { email, password });

// //   try {
// //     const db = await connectToDatabase(); // Await the connection
// //     const usersCollection = db.collection('user');
// //     const user = await usersCollection.findOne({ email });

// //     if (!user) {
// //       console.log('No user found with this email');
// //       return res.json({ success: false, message: 'Invalid email or password' });
// //     }


// //     if (user) {
// //       console.log('Login successful');
// //       const token = generateToken(res, user._id);
// //       res.json({ success: true, token });
// //     } else {
// //       console.log('Incorrect password');
// //       res.json({ success: false, message: 'Invalid email or password' });
// //     }
// //   } catch (error) {
// //     console.error('Error during login:', error);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // };

// // module.exports = { login };




// const { connectToDatabase } = require('../middlewares/database'); // Adjust path as needed
// const generateToken = require('../utils/generateToken');

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Received login request with:', { email, password });

//   try {
//     const db = await connectToDatabase(); // Await the connection
//     const usersCollection = db.collection('user');
//     const user = await usersCollection.findOne({ email });

//     if (!user) {
//       console.log('No user found with this email');
//       return res.json({ success: false, message: 'Invalid email or password' });
//     }

//     // Password validation logic here
//     if (user.password === password) { // Replace this with actual password validation logic
//       console.log('Login successful');
//       const token = generateToken(res, user._id);
//       res.json({ success: true, token });
//     } else {
//       console.log('Incorrect password');
//       res.json({ success: false, message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// const signup = async (req, res) => {
//   const { name, mobileNumber, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: 'Email already exists' });
//     }

//     const existingMobile = await User.findOne({ mobileNumber });
//     if (existingMobile) {
//       return res.status(400).json({ success: false, message: 'Mobile number already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = new User({
//       name,
//       mobileNumber,
//       email,
//       password: hashedPassword,
//     });

//     // Save user to the database
//     await user.save();

//     // Generate a token
//     const token = generateToken(user._id);

//     res.json({ success: true, token });
//   } catch (error) {
//     console.error('Error during sign up:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// module.exports = { login, signup };



const { connectToDatabase } = require('../middlewares/database');
const User = require('../models/user'); // Adjust path as needed
const generateToken = require('../utils/generateToken');

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request with:', { email, password });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('No user found with this email');
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Validate password (use bcrypt for real applications)
    if (user.password === password) {
      console.log('Login successful');
      const token = generateToken(user._id); // Pass user._id to generateToken

      // Set cookie with the token
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development', // Use true in production
        maxAge: 86400000, // 1 day
      });

      return res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('Incorrect password');
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const signup = async (req, res) => {
  const { name, mobileNumber, email, password } = req.body;

  try {
    await connectToDatabase(); // Ensure database connection is established

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const existingMobile = await User.findOne({ mobileNumber });
    if (existingMobile) {
      return res.status(400).json({ success: false, message: 'Mobile number already exists' });
    }

    // Create new user
    const user = new User({
      name,
      mobileNumber,
      email,
      password
    });

    // Save user to the database
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error during sign up:', error.message); // Log only the error message
    res.status(500).json({ success: false, message: error.message }); // Send the error message in the response
  }
};

const logout = (req, res) => {
  res.clearCookie('token'); // Clear the cookie named 'token'
  res.status(200).json({ success: true, message: 'Logout successful' });
};

module.exports = { login, signup, logout };

