const express = require ("express");
const { userAuth } = require("../middleware/utils");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

const requestRouter = express.Router();


requestRouter.post("/user/request/send/:status/:userId",  userAuth, async (req,res) => {

   
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

module.exports = requestRouter;
