const express = require('express');
const hbs = require('hbs');
const fs =require('fs');


var app = express();


const port = process.env.PORT || 3000;

app.use((req,res,next)=>{   

    var now = new Date().getFullYear();

    var log = `${now}  ${req.method} : ${req.url}`;

    console.log(log);

    fs.appendFile('sever.log',log + "\n",(err) => {
            if(err) {
                console.log('unable to append file');
            }
    })

    next();
});

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text) =>{
        return text.toUpperCase();
});

app.set('view engine','hbs');




app.use((req,res,next) => {
    res.render('maintain.hbs');
});


app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
 res.render('home.hbs',{
     Welcome : 'Hello express'
 
 });
});


app.get('/about',(req,res)=>{
    res.render('about.hbs');
});

app.get('/error',(req,res)=>{
        res.send({
            Error :'Unable to access',
            abc:{
                a:'abc',
                b:'def'
            }
        })
});

app.listen(port,()=>{
    console.log('started on port ' ,port)
});