const mongoose=require('mongoose');
const express=require('express');
const app=express();
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://medakowshik8:StEGfZQsY8AGSnNo@devtinder.qnlko.mongodb.net/devtinder?retryWrites=true&w=majority&appName=devtinder")
        console.log("Connected to MongoDB");
       
    }catch(e){
        console.log("error from mongo:",e)
    }
    
   
}

module.exports=connectDB;