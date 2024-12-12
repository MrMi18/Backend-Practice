const express = require('express');

const {userAuth} = require('../middleware/utils')

const profileRouter = express.Router();
profileRouter.get('/profile', userAuth, async (req,res)=>{
    try{

       const user = req.user;
        res.send("welcome :" + user);


    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }

})

module.exports = profileRouter;
 