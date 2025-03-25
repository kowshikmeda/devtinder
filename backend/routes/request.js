const express = require("express");
const requestRouter = express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.json({message:"Invalid status type"+status});
        }
        console.log(toUserId)
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.json({message:"User not found"});
        }
        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[{fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}]
        })
        if(existingConnectionRequest){
            return res.json({message:"Connection Request already exists"});
        }
        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data=await connectionRequest.save();
        res.json({message:req.user.firstName+" is "+status+" in "+toUser.firstName});

    }catch(err){
        res.send(err.message);
    }
   
})


module.exports=requestRouter;