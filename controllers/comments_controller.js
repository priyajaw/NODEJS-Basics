const Comment = require('../models/comment');
const Post = require('../models/post');
const user = require('../models/user')
const commentMailer=require('../mailers/comments_mailers');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();
           
            comment = await comment.populate('user', 'name email');
                
            // commentMailer.newComment(comment);
            let job=queue.create('email',comment).save(function(err){
                if(err)
                {
                    console.log('error snding queue');
                    return;

                }
                console.log('job enqued',job.id);
            })

            if (req.body.isxhr == 'true') {
                // Similar for comments to fetch the user's id!
                console.log('inside ajax')

                try{
                    

                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
             catch(err){
                console.log(err);
                return res.status(500).json({err})
             } 
            }

            else{
                req.flash('success', 'comments is created');
            res.redirect('/');
            }
        }

    }

    catch (err) {
        req.flash('errror', err);
        res.redirect('/');
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();


            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            req.flash('success', 'comments deleted')
            return res.redirect('back');

        } else {
            req.flash('error', 'cannot delete commment')
            return res.redirect('back');
        }
    }

    catch (err) {
        req.flash('error', err);
        return res.redirect('back');

    }
}