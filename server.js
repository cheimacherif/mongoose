const express = require("express")
const mongoose = require("mongoose")
const app =express()
const PORT =7070
app.use(express.json())
app.use('/api',require('./Routes/userRoutes'))
require('dotenv').config()


mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@${process.env.clusterName}.pu68n7p.mongodb.net/Persons?retryWrites=true&w=majority`)
.then(console.log('database connected')).catch(err=>{console.error(err)})


app.listen(PORT,console.log("server connected to port"+PORT))