// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./middlewares/database');
const authRoutes = require('./routes/authRoutes');
const { BASE_URL } = require('./config/config');
const errorHandler = require('./utils/errorhandler/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connect to database
connectToDatabase();

// Use routes
app.use(`${BASE_URL}`, authRoutes);
console.log("Server is running with BASE_URL:", BASE_URL);

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
