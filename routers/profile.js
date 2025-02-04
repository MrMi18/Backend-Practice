const express = require('express');
const User = require('../models/user')

const {userAuth} = require('../middleware/utils')

const profileRouter = express.Router();
profileRouter.get('/profile/view', userAuth, async (req,res)=>{
    try{

       const user = req.user;
        res.send(  user);


    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }

})
profileRouter.patch('/profile/edit/:userID', userAuth, async(req,res) =>{
    const data = req.body;
    const userID = req.user._id;
    // const user = User.findById({userID});
    // console.log(`user id is ${userID}  and data is ${data.firstName}`)
    try{
       const user =  await User.findByIdAndUpdate(userID,data);
        console.log(user);
        res.send(`User Updated Successfully`);
    }catch(err){
       res.status(400).send("Error:" + err.message);
    }
})

module.exports = profileRouter;
 