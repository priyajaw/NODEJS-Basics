const User=require('../models/user');


module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:" profile page"
    })
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
// module.exports.createSession=funcion(req,res){

// }