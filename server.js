const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login ')

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL;

// Connect to MongoDB database
mongoose.connect(db_url);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes
app.use('/Students', signupRoute);
app.use('/Students', loginRoute);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
