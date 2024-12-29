require('dotenv').config({path:'./.env'}); // Load environment variables
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const itineraryRoutes = require('./src/routes/itineraryRoutes');
const { errorlogger } = require('./src/middlewares/globalErrorLog');

const {start} = require('./src/config/db')
const app = express();
start()
// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('dev')); // Logging HTTP requests
app.use(cors()); // Enable CORS for cross-origin requests
app.use(helmet()); // Secure HTTP headers


// Routes
app.use('/api/v1', itineraryRoutes); // User-related routes

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running!' });
});

// Global Error Handling Middleware
app.use(errorlogger);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
