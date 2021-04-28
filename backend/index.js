const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {MONGOURI} = require('./Keys')
const app = express()
PORT = process.env.PORT || 5000

require('./models/user')
require('./models/book')
app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/book'))


mongoose.connect(MONGOURI,{
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true
}) 

mongoose.connection.on('connected',()=>{
    console.log("connected to mongoose!!")
})
mongoose.connection.on('error',(err)=>{
   console.log("error generated!!",err)
})


app.listen(PORT,()=>{
    console.log("server is running for book keeping..")
})