const express = require ("express");
const { userAuth } = require("../middleware/utils");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();


userRouter.get("/user/requests/list", userAuth , async (req,res) =>{

    try{
        const{user} = req;
        
        const connections = await ConnectionRequest.find({
            toUserId:user._id,
            status:"Interested"
        }).populate("fromUserId","firstName lastName Age deignation skill");


        res.json(connections);

    }
    catch(err){
        res.status(400).send("Error : " + err);
    }


})

module.exports = userRouter;

