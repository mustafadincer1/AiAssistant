const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        min : 6,
        max:25
    },
    email: {
        type : String,
        required : true,
        min : 6,
        max : 255
    }, 
    password: {
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    date:{
        type : Date,
        default : Date.now()
    },
    role:{
        type:String,
        enum:["student","employer","admin"]
    }
})
module.exports = mongoose.model('User',userSchema);