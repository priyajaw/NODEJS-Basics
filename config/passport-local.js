
const User = require('../models/user');
const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;

//auth using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
    //find a user establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err);
            console.log('error in finding user');
            return done(err);
        }
        if(!user||user.password!=password){
            req.flash('error','invalid username/password');
            console.log('invalid username');
            return done(null,false);
        }
        return done(null,user);
    })
}))


//sertailization key kept in cookies

passport.serializeUser(function(user,done){
    done(null,user.id);

})

//desertalization  key in cookies
passport.deserializeUser(function(id,done){
   User.findById(id,function(err,user){
    if(err){
        console.log('error in finding');
        return done(err);
    }
    return done(null,user);

   })

});
  passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
      return next();  
    }
    return res.redirect('/users/sign-in');
    
  }

  passport.setAuthenicatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
   next();
  }

module.exports=passport;