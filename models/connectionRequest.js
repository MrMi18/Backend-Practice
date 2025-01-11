
const mongoose = require("mongoose");
const { applyTimestamps } = require("./user");

const connectionRequestSchema = new mongoose.Schema({

        fromUserId :{
            type : mongoose.Schema.Types.ObjectId,
            required : true,
        },
        fromUserName:{
            type: String,
            
        },

        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
        },
        toUserName:{
            type: String,
            
        },

        status : {
            type: String,

            enum :{
                values: ["Interested","Accepted","Ignored","Rejected"],
                message : `  in correct status type`,
                required : true,

            }
        }

}, {timestamps : true}
)

const ConnectionRequestModel = new mongoose.model( "connectionrequest" , connectionRequestSchema);
module.exports = ConnectionRequestModel;