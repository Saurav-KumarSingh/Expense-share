const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const db = require('./config/mongoose_connect');
require('dotenv').config();
const cors = require('cors');

// CORS options
const corsOptions = {
    origin: [
        "http://localhost:5173",                  // local frontend
        "https://expense-share-five.vercel.app", 
    ],
    credentials: true,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions)); // Enable CORS


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


module.exports =app;