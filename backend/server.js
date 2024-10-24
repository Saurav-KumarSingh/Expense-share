const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const db = require('./config/mongoose_connect');
require('dotenv').config();
const cors = require('cors');

// CORS options
const corsOptions = {
    origin: 'https://expense-share-five.vercel.app', // Ensure this matches your frontend exactly
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookies, authorization headers)
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions)); // Enable CORS

// Check database connection
db.then(() => {
    console.log("Connected to the database successfully.");
}).catch(err => {
    console.error("Database connection error:", err);
});

// API routes
app.use('/api', router);

// Root endpoint for checking server
app.get('/', (req, res) => {
    res.send('Hey! Server is running.');
});

// Start server
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not set
app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT}`);
});
