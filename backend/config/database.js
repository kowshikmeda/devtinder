const mongoose=require('mongoose');
const express=require('express');
const app=express();
require('dotenv').config();

//console.log(process.env.MONGODB_URL);
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
       
    }catch(e){
        console.log("error from mongo:",e)
    }
    
   
}

module.exports=connectDB;