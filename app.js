const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');  // Importing authentication-related routes
const cookieParser = require('cookie-parser');      // Middleware for parsing cookies
const { requireAuth, checkUser } = require('./middleware/authMiddleware'); // Middleware for authentication checks

const app = express();  // Initialize express app
app.use(express.json()); // Middleware to parse incoming JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies sent with requests

// Static middleware to serve files from the 'public' folder
app.use(express.static('public'));

// Set 'ejs' as the view engine to render dynamic views
app.set('view engine', 'ejs');

// Database connection (MongoDB)
const dbURI = 'mongodb://localhost:27017/node-auth'; // MongoDB connection string for local instance
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })  // Connecting to MongoDB
  .then(() => {
    // Start server only after successful database connection
    app.listen(3001, () => {
      console.log('listening on port 3001'); // Server listens on port 3001
    });
    console.log('connected to mongodb'); // Log successful connection to MongoDB
  })
  .catch((err) => console.log(err)); // Catch and log any connection errors

// Routes
app.get('*', checkUser); // Middleware to check user authentication for all routes
app.get('/', (req, res) => res.render('home'));  // Home route, renders 'home' view
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies')); // Smoothies route, protected by requireAuth middleware

app.use(authRoutes); // Use authentication routes from 'authRoutes' module

