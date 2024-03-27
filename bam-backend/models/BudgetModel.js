const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please add fullname"]
    },
    type : {
        type: String,
        required : [true, "Please add type"],
    },
    category : {
        type :String,
        required : [true, "Please add category"]
    },
    creator : {
        type : String,
    },
    collaborators : {
        type : Array,
    },
    attachments : {
        type : String,
    },
    approvers : {
        type : Array,
    },
    rowCount : {
        type : Number,
    },
    columnCount : {
        type : Number,
    },
    form : {
        type : Array,
    },
    isDraft : {
        type : String,
    },
    isSubmitted : {
        type : String,
    },
    isApproved : {
        type : String,
    },

},

{
    timestamps : true
});

module.exports = mongoose.model("budget", userSchema)