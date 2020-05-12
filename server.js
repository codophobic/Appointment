const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport= require('passport');
const path = require('path');
const compression= require('compression');

const users= require('./routes/api/users');
const admin= require('./routes/api/adminRoute');
const doctorModel = require('./models/doctor');
const app =express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const db= require('./config/key').mongoUri;
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log("mongo connected"))
.catch(err=>console.log(err));

//saving dummy data to the database
 
app.post('/adminTest',(req,res)=>{
    console.log(req.body);
    res.status(200).json({
        status:"Success"
    })
})


app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/users',users);

app.use('/admin',admin);

app.use(compression());

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const port=  process.env.PORT||5000;

app.listen(port,()=>console.log(`server running in ${port}`));