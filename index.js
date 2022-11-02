const express=require('express');
//adding cookie parser

const cookieParser=require('cookie-parser');

const app=express();
  const port=9000;
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const MongoStore=require('connect-mongo');

const mongoose = require('mongoose');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

 app.use(sassMiddleware({


  src:'./assests/scss',
  dest:'./assests/css',
  debug:false,
  outputStyle:'extended',
  prefix:'/css'
 }))


 const bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assests'));


app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//to set up view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in db
app.use(session({
  name:'codeial',
  secret:'blah',
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100)

  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/codeial_dev',
  },
  function(err){
    console.log(err|| 'connect-mongodb setup');

  })

}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenicatedUser);//middleware called sign in vala in local as views

app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));



  app.listen(port,function(err){
    if(err){
        console.log('error in running server');

    }
    console.log(`${port}`);
  })