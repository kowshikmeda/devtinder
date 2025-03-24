const express = require("express");
const requestRouter = express.Router();
const {userAuth}=require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user=req.user;
    console.log("request connection");
    res.send("request connection is send by"+user.firstName)
})


module.exports=requestRouter;