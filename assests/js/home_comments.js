




// {
//   let commentsSer=(form)=>{
//     let formData=new FormData(form);
//     let data={
//         content: formData.get('content'),
//         post:formData.get('post'),

//     }
//     console.log(data);
//     return `content=${data.content}&post=${data.post}&isxhr=true`
//   }

//     let newsubmit = function(e){
//         e.preventDefault();
//        console.log('form submit')
//         $.ajax({
//             type:'post',
//             url:'/comments/create',

//             data:commentsSer(e.currentTarget),
//             success:function(data){
//                 // let newCom=newComDom(data.comment);
//                 // $('#post-comments-list>ul').prepend(newCom);
//                 console.log(data);

//             },error:function(error){
//                 console.log(error.responseText);
//             }

//         })
//        };
//        let formArray=document.querySelectorAll('.post-comments-form');
//        for(let form of formArray){
//         //    console.log(form);

//            form.addEventListener('submit',newsubmit)
//        }
   

//     // let createCom=function(){
//     //     let newComForm=$('.post-comments-form');
//     //     console.log(newComForm);

//         //  for(let i of newComForm) i.submit(()=>console.log('form submitted'))

       
       
       

//     // }  

//     let newComDom=function(comment){
//         return $(`<li id="comment-${comment._id}">
//         <p>
          
//             <small>
//                 <a class="delete-comment-button" href="/comments/destroy/${ comment.id }">X</a>
//             </small>
            
//             ${comment.content }
//             <br>
//             <small>
//             ${comment.user.name }
//             </small>
//         </p>   
//     </li>`)
//     }
//     // createCom();

// }

let createCom=function(){
    let newComForm
}