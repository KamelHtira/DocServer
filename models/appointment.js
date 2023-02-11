const mongoose = require("mongoose");

const appointment = mongoose.Schema({
    name : String,
    date : String,
    time : String,
    description : String
})

module.exports =  appointment;