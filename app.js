// Appealing to Express throught "app"
const express = require('express')
const app = express()
const morgan = require('morgan')

// Creation of an array of objects
const members = [
    {
        id: 1,
        name: 'John'
    },
    {
        id: 2,
        name: 'Julie'
    },
    {
        id: 3,
        name: 'Jack'
    }
]

// Appealing to Morgan to get logging request details
app.use(morgan('dev'))

// Url creation and parameters setting
app.get('/api/v1/members/:id' ,(req, res) => {
    res.send(members[(req.params.id)-1].name)
})

app.get('/api/v1/members', (req, res) => {
    // Using req.query ?=max to display the array
    if (req.query.max != undefined && req.query.max > 0) {
        res.send(members.slice(0, req.quuery.max))
    } else {
    res.send(members)
    }
})

// Listenning 
app.listen(8080, ()=>{
    console.log('Started on port 8080')
})