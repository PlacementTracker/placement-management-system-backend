const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login ')
const adminLogin = require('./routes/Admin')
const studentRoutes = require('./routes/StudentRoutes')
const jobroute = require('./routes/jobs')
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
app.use(cors());
app.use('/Uploads',express.static('Uploads'))
// Define routes
app.use('/Students', signupRoute);
app.use('/Students', loginRoute);
app.use('/Admin', adminLogin);
app.use('/Students', studentRoutes);
app.use('/Admin',jobroute)
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
