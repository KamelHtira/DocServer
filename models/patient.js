const mongoose = require("mongoose");

const patient = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    age : Number,
    // job : String,
    // dateOfBirth : String,
    address : String,
    phone : String,
    // paymentStatus:{
    //     type:String,default:"NA"
    // },
})

module.exports =  patient;