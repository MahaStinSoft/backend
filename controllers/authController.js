// // controllers/authController.js

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


//     if (user) {
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

// module.exports = { login };




const { connectToDatabase } = require('../middlewares/database'); // Adjust path as needed
const generateToken = require('../utils/generateToken');

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request with:', { email, password });

  try {
    const db = await connectToDatabase(); // Await the connection
    const usersCollection = db.collection('user');
    const user = await usersCollection.findOne({ email });

    if (!user) {
      console.log('No user found with this email');
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    // Password validation logic here
    if (user.password === password) { // Replace this with actual password validation logic
      console.log('Login successful');
      const token = generateToken(res, user._id);
      res.json({ success: true, token });
    } else {
      console.log('Incorrect password');
      res.json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { login };
