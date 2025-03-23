const mongoose=require('mongoose');
const express=require('express');
const app=express();
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://medakowshik8:kNnCgSr8oTb0Iib2@devtinder.5dubi.mongodb.net/?retryWrites=true&w=majority&appName=devtinder")
        console.log("Connected to MongoDB");
       
    }catch(e){
        console.log("error from mongo:",e)
    }
    
   
}

module.exports=connectDB;