const User=require('../models/user');


module.exports.profile=function(req,res){
   if(req.cookies.user_id){
    User.findById(req.cookies.user_id,function(err,user){
        if(user){
            return res.render('user_profile',{
                title:"user profile",
                user:user
            })
        }
         
            return res.redirect('/users/sign-in')
    });

 
}
else{
    return res.redirect('/users/sign-in')
}
}
module.exports.signUp=function(req,res){
    return res.render('signUp',{
        title:"sign Up"
    })
}
module.exports.signIn=function(req,res){
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
//find the user

User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error in finding user');
        return;

//handle user found
    }
    if(user){
        
//handle password which don't match

        if(user.password!=req.body.password){
            return res.redirect('back');
        }




//handle session creation
res.cookie('user_id',user.id);
return res.redirect('/users/profile');

    }
    else{
        
//handle user not found
return res.redirect('back');
    }
})

}