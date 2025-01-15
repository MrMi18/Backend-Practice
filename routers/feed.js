const express = require('express');

const {userAuth} = require('../middleware/utils');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

const feedRouter = express.Router();
const allowedUserInfo = "firstName lastName Age skill designation";
feedRouter.get('/feed', userAuth, async (req,res)=>{
    try{


        const page = parseInt (req.query.page)||1;

        let limit = parseInt (req.query.limit)||10;
        limit = limit>50?50:limit;
        const skip = (page-1)*limit;
       

        const user = req.user;

        const usersToBeHide = await ConnectionRequest.find(
            {
                $or:[
                {fromUserId:user._id},
                {toUserId:user._id}
            ]
            }
        ).select("fromUserId toUserId");
        const hiddenUserId = [];
        usersToBeHide.map(ids => 
        {
        hiddenUserId.push(ids.fromUserId.toString())
        hiddenUserId.push(ids.toUserId.toString())
    }
    );
       
        const allUser = await User.find(
            {
               _id:{ $nin: [...hiddenUserId, user._id] }
        } ).select(allowedUserInfo)
        .skip(skip).limit(limit);
        

        
       

        res.send( allUser);


    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }

})
module.exports = feedRouter;