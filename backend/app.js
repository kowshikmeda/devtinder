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

app.get("/user",async(req,res)=>{
    try{
      const {emailId:userEmail}=req.body; 
      const userdata=await User.find({emailId:userEmail});
      if(userdata.length==0){
          res.send("No user found");
      }else{
        res.send(userdata);
      }
     
    }catch(err){
      res.send(err.message);
    }
})
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

app.get("/feed",async(req,res)=>{
    try{
    const userdata=await User.find({});
    if(userdata.length==0){
        res.send("No user found");
    }else{
      res.send(userdata);
    }
}
  catch(err){
    res.send(err.message);
  }

})

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        //const user=await User.findByIdAndDelete(_id:userId);
        if(user){
            res.send("User deleted successfully");
        }
        else{
            res.send("User not found");
        }
    }catch(err){
        res.send(err.message); 
    }
})

app.patch("/user/:userId",async(req,res)=>{
    const {userId}=req.params;
    const data=req.body;
    try{
        const ALLOWEDUPDATES=["photoUrl","about","gender","skills"];
        const isUpdateAllowed=object.keys(data).every((k)=>ALLOWEDUPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update is not allowed");
        }
        if(data?.skills.length>10){
            throw new Error("Skills should be not more than 10");
        }
        const user= await User.findByIdAndUpdate({_id:userId},data,
            //{returnDocument:"before"});
            {returnDocument:"after",
                runValidators:true,
            }); 
            console.log(user);
        res.send("updated successfully"+user);

    }catch(err){
        res.send(err.message); 
    }
})

connectDB().then(()=>{
    app.listen(3000,()=>{   
        console.log(`Server is running on port 3000`);
    });
}).catch((err)=>{
    console.log("error from connectDB",err);
})



