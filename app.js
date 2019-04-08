// Appealing to Express throught "app"
const express = require('express')
const app = express()
// Appealing to Morgan to get logging request details
const morgan = require('morgan')
app.use(morgan('dev'))

// Creation of url
app.get('/api', (res, req) =>{
    res.setEncoding('Root API')
})

app.get('/api/v1' (res, req) =>{
    res.send('API Version 1')
})


// Setting url parameter with req.params
app.get('api/v1/books:id', (req, res)=>{
    res.send(req.params)
})

app.listen(8080, ()=>{
    console.log('Started on port 8080')
})