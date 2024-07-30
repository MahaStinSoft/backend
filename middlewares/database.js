// // middlewares/database.js

// const { MongoClient } = require('mongodb');
// const { DB_URI, DB_NAME } = require('../config/config');

// let db = null;

// const connectToDatabase = async () => {
//   if (db) return db;

//   try {
//     const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();
//     db = client.db(DB_NAME);
//     console.log('Database connected');
//     return db;
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw new Error('Database connection failed');
//   }
// };

// module.exports = { connectToDatabase };



const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

module.exports = { connectToDatabase };
