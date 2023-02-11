const express=require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const patientRouter = require('./routers/patient.router');
const exportRouter = require('./routers/export.router');

require('dotenv').config();

app = express()
app.use(cors())
app.use(patientRouter);
app.use("/download",exportRouter);

// database connection
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://hedi:1234@cluster0.qfe1yrj.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected to MongoDB using Mongoose");
});


app.get('/',(req,res)=>{
    res.json({response:"Doc Server is Working.."})
})

app.listen(3001, ()=>{
    console.log("Doc server working on port 3001..");
})