const express=require('express');
const app=express();
const cors=require("cors");
const dotenv=require("dotenv")
const path=require("path")
const connectDB=require('./config/database');
const cookieParser=require("cookie-parser");
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
dotenv.config();
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
const __dirname=path.resolve();
let port=process.env.PORT;
if(process.env.MODE==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })

}
connectDB().then(()=>{
    app.listen(port,()=>{   
        console.log(`Server is running on ${port} `);
    });
}).catch((err)=>{
    console.log("error from connectDB",err);
})



