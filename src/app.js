const express = require("express"); 
const{connectDb} = require("../config/Database")
const User = require('../models/user');


const app = express();

app.use(express.json());

app.post('/signup', async (req,res)=>{
    const user = new User(req.body);


    try{
        await user.save();
        res.send("hey suceessfully data send to database");
    }
    catch(err){
        res.status(400).send("bad Request    "+err.message);

    }

})

 app.get('/user', async(req,res)=>{
    const testname = req.body.firstName;
    
    try{
       const users =   await User.find({firstName:testname});
        if(users.length!=0){
       
            res.send(users);
        }else{
            res.status(404).send("user Not found with this email");
        }
    }catch(err){
        res.status(400).send("somthing went wrong   ");
    }
    
 })

 app.delete('/user', async (req,res)=>{
    const userId = req.body.userId;
    console.log(userId)
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send(`${user.firstName} data has been deleted` );

    }catch(err){
        res.status(400).send("Somthing wrong")
    }
 })

 app.patch('/login', async (req,res) =>{
       const id = req.body.id;
       const data = req.body;
       try{
        await User.findByIdAndUpdate(id,data);
        res.send("user updated")
       }catch(err){
        res.status(400).send("Somthing Went wrong");
       }
 })













  app.patch('/user', async (req,res) => {
    const data = req.body;
    const userId = req.body.userId;
    console.log(userId ,data)
    try{
        await User.findByIdAndUpdate(userId, data);
        res.send("user data updated");
    }catch(err){
        res.status(400).send("unable to Add " +err.message)
    }
   
  }
)






connectDb()
.then(()=>{
    console.log("Database Connected Succesfully..");
    app.listen(3000,()=>{
        console.log("hey Server is running.....");
    });

})
.catch((err) =>{
    console.log("Database connection not established"+err.message)
});


