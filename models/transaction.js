const mongoose = require("mongoose");

const transaction = mongoose.Schema({
    amount : Number,
    description : String,
    type : String,
    date : String, // DD/MM/YYYY
})

module.exports =  transaction;