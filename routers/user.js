const express = require ("express");
const { userAuth } = require("../middleware/utils");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const allowedUserInfo = "firstName lastName Age skill designation";
userRouter.get("/user/requests/list", userAuth , async (req,res) =>{

    try{
        const{user} = req;
        
        const connections = await ConnectionRequest.find({
            toUserId:user._id,
            status:"Interested"
        }).populate("fromUserId",allowedUserInfo);


        res.json(connections);

    }
    catch(err){
        res.status(400).send("Error : " + err);
    }


})


userRouter.get( "/user/connections", userAuth, async (req,res) =>{
    try{

        const{user} = req;
        const userId = user._id;


        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:userId},
                {toUserId:userId}
            ],
            status:"Accepted",
        }).populate("fromUserId", )
        .populate("toUserId",allowedUserInfo);


        const data = connections.map(user =>{
        
            return userId.toString()===user.fromUserId._id.toString()?user.toUserId:user.fromUserId;
        })



        res.json(data);

    }
    catch(err){
        res.status(400).send("Error :"+ err.message);
    }
})

module.exports = userRouter;

