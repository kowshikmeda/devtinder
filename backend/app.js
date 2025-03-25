const express=require('express');
const app=express();
const cors=require("cors");
const connectDB=require('./config/database');
const cookieParser=require("cookie-parser");
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



connectDB().then(()=>{
    app.listen(3000,()=>{   
        console.log(`Server is running on port 3000`);
    });
}).catch((err)=>{
    console.log("error from connectDB",err);
})



