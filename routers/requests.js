const express = require ("express");
const { userAuth } = require("../middleware/utils");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");
const mongoose = require("mongoose");

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:userId",  userAuth, async (req,res) => {

   
    try{
        const fromUserId = req.user._id;
        const fromUser = await user.findById(fromUserId);
        const toUserId = req.params.userId;
        const toUser = await user.findById(toUserId);
        const status = req.params.status;
        if(!toUser){
            return res.status(404).send("Requested user not found");
            
        }
        fromUserName = fromUser.lastName;
        toUserName = toUser.lastName;

            const acceptedStatus = ['Interested','Ignored']
        if(!acceptedStatus.includes(status)){
            throw new Error("Invalid status, status should be Interested or Ignored");
        }
        if(fromUserId.toString()===toUserId){  
             
            throw new Error ("Can't send request to self");
        }

        

        const connection = await ConnectionRequest.findOne({

            $or: [
               { fromUserId,toUserId},
               { fromUserId:toUserId, toUserId:fromUserId  }
            ]
           
        })
        if(connection){
            throw new Error("Requeste already sended");
        }

        const connectionRequest = await new ConnectionRequest({
            fromUserId,toUserId,status,fromUserName,toUserName
       })
        
       await connectionRequest.save();
        res.send(`${fromUserName}  ${status} ${toUserName} Succesfully`);
    }
    catch(err){
        res.status(400).send("bad request  "+err.message)
    }

})

requestRouter.post("/request/review/:status/:connectionId", userAuth , async (req,res) =>{

    try{
        const{status,connectionId} = req.params;
        
       const allowedStatus = ["Accepted","Rejected"];
       if(!allowedStatus.includes(status)){
         return res.status(400).json("Invalid status type, status should be Accepted or Rejected");
       }
       // checking connection id befor becouse it will show caste error agar apan niche handle bhi kare to bhi ye error show karega cast error
       if (!mongoose.Types.ObjectId.isValid(connectionId)) {
        return res.status(400).json({ error: "Invalid connection ID format." });
    }
        const connectionRequest = await ConnectionRequest.findOne({
            _id:connectionId,
            toUserId:req.user._id,
            status:"Interested"
            
        })
       
        if(!connectionRequest){
            console.log("user not ");
            return res.status(404).send("connection not found");
        }
       
            connectionRequest.status  = status;
        
        await connectionRequest.save();
        res.json(`${connectionRequest.toUserName} ${status} the request of ${connectionRequest.fromUserName} `);


    }
    catch(err){
        res.status(400).json("Error : " + err);
    }

} )

module.exports = requestRouter;
