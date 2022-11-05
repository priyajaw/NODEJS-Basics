
const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index= async function(req,res){




    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200,{
        message:"lists of posts",
        posts:posts
    })
}
module.exports.destroy = async function (req, res) {
    try{    
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
    
            post.remove();
           await  Comment.deleteMany({ post: req.params.id }); 
        //    if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post_id:req.params.id
        //         },
        //         message:'post deleted'
        //     })
        //    }
        //    req.flash('success','post and comments deleted')
                return res.json(200,{
                    message:"posts and comments deleted"
                });
    
        
    
        }
        else{
           return res.json(401,{
            message:"you cannot delete post"
           })
        }
    
    }catch(err){
        // req.flash('error',err);
        console.log("ddddddddd",err);
        return res.json(500,{
            message:'interval error'
        })
        }
}