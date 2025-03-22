const express=require('express');
const app=express();
const cors=require("cors");
const port=3000;
const connectDB=require('./config/database');
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello World");
});
app.get("/login",(req,res)=>{
    console.log("from login");
    res.json({message:"from login"});  
})

app.listen(port,()=>{   
    connectDB();
    console.log(`Server is running on port ${port}`);

});

