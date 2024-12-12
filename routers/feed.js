const express = require('express');

const {userAuth} = require('../middleware/utils');

const feedRouter = express.Router();
feedRouter.get('/feed', userAuth, async (req,res)=>{
    try{

        const user = req.user;
        console.log("user"+ user);
       
        res.send( user);


    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }

})
module.exports = feedRouter;