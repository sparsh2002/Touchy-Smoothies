const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
dotenv.config()
const app = express();
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./middleware/authMiddleware');
// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.URI
const PORT = process.env.PORT
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    app.listen(PORT)
    console.log(`listening on PORT ${PORT}`)
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth ,(req, res) => res.render('smoothies'));
app.use(authRoutes)


