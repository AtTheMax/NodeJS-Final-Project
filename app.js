const express = require('express')
const router = express.Router()
const app = express()
const mongoose = require('mongoose')
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
var passport = require("passport");

//require('./routes/index.js')(passport)

mongoose.connect('mongodb+srv://admin:admin@apwprojectcluster.amx2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('App Connected!'))
.catch((err)=> console.log(err))

app.set('view engine','ejs')
app.use(expressEjsLayout)

app.use(express.urlencoded({extended : false}))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
next() 
})

app.get('login.ejs', (req, res) => {
    res.render('login');
   });
app.get('signup.ejs', (req, res) => {
    res.render('signup');
   });
app.use('/views', express.static('public'))

app.listen(3000)