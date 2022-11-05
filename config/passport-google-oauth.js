const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use new strategru for google login
passport.use(new googleStrategy({
    clientID:"821275808614-7849beon5t6n9bsv2en5ed1cnd89bjv6.apps.googleusercontent.com",

    clientSecret:"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",
    callbackURL:"http://localhost:9000/users/auth/google/callback",
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google-stragey',err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null,user);
        }
        else{
            //if not found sign in , set as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')

            },
            function(err,user){
                if(err){
                    console.log('error in google-stragey',err);
            return;
                }
                return done(null,user);
            })
        }
    
    })
}

))


module.exports=passport;