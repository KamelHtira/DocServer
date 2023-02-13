const mongoose = require('mongoose');
const userSchema = require('../models/user')
const User = mongoose.model('User', userSchema);

const login =  async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(400).json({ msg: 'Incorrect password' });
      }
  
      res.json({ msg: 'Login successful' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  module.exports = {
    login
  }
