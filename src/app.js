const express = require("express"); 
const{connectDb} = require("../config/Database")
const cookieParser = require('cookie-parser');
const authRouter = require("../routers/auth");
const profileRouter = require("../routers/profile");
const feedRouter = require("../routers/feed");
const requestRouter = require("../routers/requests");
const userRouter = require("../routers/user");
const cors = require('cors');




const app = express();

app.use(cookieParser());  // Parses cookies
app.use(express.json());  // Parses JSON bodies.

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use('/', requestRouter);
app.use('/',authRouter);
app.use('/', profileRouter);
app.use('/', feedRouter);
app.use('/', userRouter);






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


