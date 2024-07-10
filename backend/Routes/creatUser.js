const express=require('express');
const router=express.Router();
const User=require('/Users/amitvaishnav/Desktop/codes/go_food/backend/newModel/User');
const { body, validationResult } = require('express-validator');
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="MynameisEndtoEndYoutubeChannel$#";
//Code to create a user id, To save data
   router.post('/creatuser'             
,[
    body('email').isEmail(),
    body('password').isLength({min:5}),
    body('name').isLength({min:5})
]
,async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //How to encrypt password using bcrypt:
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    }
    catch(error){
        console.log(error);
        res.json({success:false});
    }
})

//Code for login page: 
router.post('/loginuser',[
    body('email').isEmail(),
    body('password').isLength({min:5})
]           
,async (req,res)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg:"Invalid Email or Password format",errors: errors.array()});
    }
        let email=req.body.email;
        try{
            let userData=await User.findOne({email: email});
            if(!userData){
                return res.status(400).json({msg: "Incorrect email"});
            }
            const pwdCompare= await bcrypt.compare(req.body.password,userData.password);
            if(!pwdCompare){
                return res.status(400).json({msg: "Incorrect password"});
            }
            //generating authToken: 
            const data={          
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret);  //set an authToken
            return res.json({success:true,authToken:authToken});    //get an authToken
        }
        
    catch(error){
        console.log(error);
        res.json({success: false,msg: "Error in logging in "});
    }
}
)
module.exports=router;