const express=require("express");
const authRouter=express.Router();
const User=require("../models/user");
const {validateSignupData}=require("../utils/validation");
const bcrypt=require('bcrypt');

authRouter.post("/signup",async(req,res)=>{
    try{
        validateSignupData(req);
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10)
       
       console.log(firstName,lastName,emailId,password);   
        const user=new User({
            firstName,lastName,emailId,password:passwordHash
        });
        await user.save();
        res.send("user added successfully");
    }catch(err){
        res.send(err.message);
    }
})

authRouter.post("/login",async(req,res)=>{
    try{
     const {emailId,password}=req.body;
     const  user=await User.findOne({emailId});
     console.log("user",user);
     if(!user){
         throw new Error("Invalid Credentials");
     }
     const isPasswordValid=await user.validatePassword(password);
     if(!isPasswordValid){
         throw new Error("Invalid Credentials");
     }
     const token= await user.getJWT();
     console.log(token);
     res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
     res.send("Login successful");
 
    }catch(err){
     res.send(err.message);
    }
 })
module.exports=authRouter;