const User=require('../models/user');
const fs=require('fs');
const path=require('path');
const { render } = require('ejs');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:" profile page",
            profile_user:user
        })
    })
   
}
module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
    //         return res.redirect('back');
    //     })

    // }else{
    //     return res.status(401).send('unauthorized');
    // }

    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err) console.log(err);
              
                // console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){

                    if(user.avatar){
fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+'/'+ req.file.filename;

                }
                user.save();
                return res.redirect('back');
            })
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back')
        }
    }
    else{
        req.flash('error','unauthorized');
        return res.status(401).sen('unauthorized');
    }
}




module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
   return res.redirect('/users/profile');

   }

   return res.render('signUp',{
    title:"cdoial sign up"
   })
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return   res.redirect('/users/profile');
    
       }
    return res.render('signIn',{
        title:"sign In"
    })
}
// get up sign up data
module.exports.create=function(req,res){
 if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
 } 
 User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error finding user');
        return}
    if(!user){
        User.create(req.body,function(err,user){
            if(err){
                console.log('error in creating user'); return;
            }
            return res.redirect('/users/sign-in');

        })

    }else{
        return res.redirect('back')

    }
    
 }); 
}
module.exports.createSession=function(req,res){
    req.flash('success','logged in succesfully00');
     return res.redirect('/');
}
module.exports.destroySession = function(req, res,next){
    req.logout(function(err) {
        if (err) {
          return next(err);
        }
        req.flash('success','you have logged out');
       return res.redirect("/");
      });
    }
module.exports.Forgetpassword=function(req,res){
    return res.render('forget',{
        title:"forgot pss"
    })
    
}