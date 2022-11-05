const nodeMailer=require('../config/nodemailer');



exports.newPosts=(post)=>{
    // console.log('inside post mailer',post);
    let htmlString=nodeMailer.renderTemplate({post:post},'/posts/new_posts.ejs')


    nodeMailer.transporter.sendMail({
        from:'priyajaw637@gmail.com',
        to: post.user.email,
        subject:'post published',
        // html:'<h1>post</h1>'
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('message sent',info);
        return;
    })
}