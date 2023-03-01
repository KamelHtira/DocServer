const { hashSync} = require('bcrypt');


const User = require("../models/user.js");

function signup(req,res){
  const user = new User({
    username: req.body.username,
    password: hashSync(req.body.password, 10)
})

user.save().then(user => {
    res.send({
        success: true,
        message: "User created successfully."
    })
}).catch(err => {
    res.send({
        success: false,
        message: "Something went wrong",
        error: err
    })
})
}


  module.exports = {signup};