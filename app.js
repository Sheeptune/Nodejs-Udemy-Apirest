// Appealing to Express throught "app"
const express = require('express')
const app = express()
// Appealing to Morgan to get logging request details
const morgan = require('morgan')
app.use(morgan('dev'))





app.listen(8080, ()=>{
    console.log('Started on port 8080')
})