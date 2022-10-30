const User=require('../models/user');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:" profile page",
            profile_user:user
        })
    })
   
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
            return res.redirect('back');
        })

    }else{
        return res.status(401).send('unauthorized');
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
     return res.redirect('/');
}
