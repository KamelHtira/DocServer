const express=require('express')
const cors = require('cors')


app = express()
app.use(cors())

app.get('/',(req,res)=>{
    res.json({response:"Med Server is Working.."})
})

app.listen(3001, ()=>{
    console.log("med server working on port 3001..");
})