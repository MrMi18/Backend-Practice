const express = require('express');
const User = require('../models/user')

const {userAuth} = require('../middleware/utils')

const profileRouter = express.Router();
profileRouter.get('/profile/view', userAuth, async (req,res)=>{
    try{

       const user = req.user;
        res.send("welcome :" + user);


    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }

})


module.exports = profileRouter;
 