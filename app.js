const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
dotenv.config()
const app = express();
const cookieParser = require('cookie-parser')
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
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)


app.get('/set-cookies' , (req , res) =>{
  // res.setHeader('Set-Cookie' , 'newUser=true')
  res.cookie('newUser' , false)
  res.cookie('isEmployee' , true , {maxAge: 1000*60*60*24})
  res.send('you got the cookies')
})

app.get('/read-cookies' , (req, res)=>{
  const cookies = req.cookies;
  console.log(cookies)
  res.json(cookies)
})