const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : [true, "Please add fullname"]
    },
    email : {
        type: String,
        required : [true, "Please add email"],
        unique : [true, "Email address already taken"]
    },
    password : {
        type :String,
        required : [true, "Please add password"]
    },
    enabled : {
        type :String,
    },
    role : {
        type :String,
    },
},

{
    timestamps : true
});

module.exports = mongoose.model("users", userSchema)