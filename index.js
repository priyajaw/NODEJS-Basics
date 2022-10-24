const express=require('express');
const app=express();
  const port=8000;

const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assests'));


app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

  app.use('/',require('./routes'));
//to set up view engine
app.set('view engine','ejs');
app.set('views','./views');



  app.listen(port,function(err){
    if(err){
        console.log('error in running server');

    }
    console.log(`${port}`);
  })