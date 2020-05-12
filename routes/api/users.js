const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");

const ValidateRegisterInput = require('../../validation/register');
const ValidateLoginInput = require('../../validation/login');

const Usermodel= require('../../models/user');
const Docmodel= require('../../models/doctor');



router.get('/bookdata/:id',(req,res)=>{
    //console.log(req.params.id);
    Usermodel.findOne({_id:req.params.id},(err,doc)=>{
        if (err) 
        {
            console.log(err);
            res.status(400).json({message:"id not found"})
            
        }
        else{
            //console.log(doc);
          res.status(200).json(doc);

        }
    })
})

router.post('/register',(req,res)=>{
    const {errors,isValid} = ValidateRegisterInput(req.body);

    if(!isValid)
    return res.status(400).json(errors);

    Usermodel.findOne({email:req.body.email}).then(user=>{
      if(user)
      return res.status(404).json({email:"Email already exists"});
      else
      {
          const newUser = new Usermodel({
              name:req.body.name,
              email:req.body.email,
              password:req.body.password,
              bookdata:[]
          });

          bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err)
                console.log(err);
                else
                {
                newUser.password=hash;
                newUser.save()
                .then(user=>res.json(user))
                .catch(err=>console.log(err))
                }
              });
              
          });
      }
    });
  
});

router.post('/login',(req,res)=>{
    const {errors,isValid} = ValidateLoginInput(req.body);

    if(!isValid)
    return res.status(400).json(errors);
    const email = req.body.email;
    const password = req.body.password;
    Usermodel.findOne({email}).then(user=>{
        if(!user)
        return res.status(404).json({email:"Email not found"});

        bcrypt.compare(password,user.password).then(ismatch=>{
            if(ismatch)
            {
                const payLoad={
                    id:user.id,
                    name:user.name
                };

                jwt.sign(payLoad,
                    keys.secretOrKey,
                    {
                        expiresIn:3600
                    },
                    (err,token)=>{
                        res.json({
                            success:true,
                            token:"Bearer "+token,
                            id:payLoad.id,
                            name:payLoad.name
                        });
                    }
                    );
            }
            else{
                return res
          .status(400)
          .json({ password: "Password incorrect" });
            }
        })

    })
});

router.post('/book',async (req,res)=>{
    const inData={
        name:req.body.name,
        phone:req.body.phone,
        time:req.body.time,
        id:req.body.id
    }
    //console.log(inData);
    //console.log(req);
    await Usermodel.findOne({_id: req.body.userId}).then(doc=>{ 
         
        
        //console.log(doc+"  as");
        // console.log(doc.name);
        //  console.log(doc.bookdata+" itsme");
   let f=0;
        
         let dArray= doc.bookdata;
          for(let i=0;i<dArray.length;i++)
          {
              if(dArray[i].id===inData.id)
              {
                  f=1;
                  break;
              }
          }
if(f===1)
{
    res.status(200).json({message:'This appointment is already booked'})
}
else
{
         dArray.push(inData);
         //console.log(dArray);
          doc.bookdata=dArray;
         doc.save().then(g=>console.log(g)).catch(err=>console.log(err));
        res.status(200).json({
            message:"Your appointment is booked"
        })
    }
    }).catch(err=>{
        res.status(400).json({message:'id not found'})
    });
    
});


router.get('/data',(req,res)=>{
    Docmodel.find({},(err,result)=>{
        if(err)
        console.log(err);
        else
        {//console.log(result);
            res.status(200).json(result);
        }
    })
})
module.exports= router;