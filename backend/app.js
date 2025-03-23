const express=require('express');
const app=express();
const cors=require("cors");
const User=require('./models/user');
const connectDB=require('./config/database');
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello World");
});
app.post("/signup",async(req,res)=>{
    try{
        const {firstName,lastName,emailId,password,age}=req.body;
        console.log(firstName,lastName,emailId,password,age);   
        const user=new User({
            firstName,
            lastName,
            emailId,
            password,
            age,
        });
        await user.save();
        res.send("user added successfully");
    }catch(err){
        res.send(err.message);
    }
})
app.get("/login",(req,res)=>{
    console.log("from login");
    res.json({message:"from login"});  
})

connectDB().then(()=>{
    app.listen(3000,()=>{   
        console.log(`Server is running on port 3000`);
    });
}).catch((err)=>{
    console.log("error from connectDB",err);
})



