const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes'); // Adjust path as per your file structure
const endorsmentRoutes = require('./routes/endorsmentRoutes'); // Adjust path as per your file structure

const cors = require('cors'); // Import CORS middleware
const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI = 'mongodb://localhost:27017/shafafia'; // Replace with your MongoDB URI

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());



// Routes
app.use('/api', personRoutes); // Prefix all routes with '/api'
app.use('/api', endorsmentRoutes); // Prefix all routes with '/api'

// Connect to MongoDB
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
