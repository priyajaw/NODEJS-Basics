
const Post=require('../models/post');
const User=require('../models/user');


module.exports.home=function(req,res){
// console.log(req.cookies);
// res.cookie('user_id',100);


// Post.find({},function(err,posts){
//     return res.render('home',{        title:"home",
//         posts:posts
//     })
// })
//populate

// Post.find({}).populate('user').exec(function(err,posts){
//     return res.render('home',
//     {
//         title:"| home",
//         posts:posts
//     })
// })

Post.find({})
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user'
    }
})


.exec(function(err,posts){

User.find({},function(err,users){
    return res.render('home',
    {
        title:"| home",
        posts:posts,
        all_users:users
    })
    
})

    
})
    
}
