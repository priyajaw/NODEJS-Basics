const nodeMailer=require('../config/nodemailer');


exports.newComment= (comment)=>{
    console.log('inside newcomment mailer',comment);
let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:'codingset789@gmail.com ',
        to:comment.user.email,
        subject:"new comment published",
        html:htmlString
    },
    (err,info)=>
    {
        if(err){
            console.log(err,'sending mail');
            return;
        }

    
    console.log('message sent',info);
    return;
 })
} // this anther way module.exports=newComments