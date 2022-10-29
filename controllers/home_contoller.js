
const Post=require('../models/post');


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
    return res.render('home',
    {
        title:"| home",
        posts:posts
    })
})
    
}
