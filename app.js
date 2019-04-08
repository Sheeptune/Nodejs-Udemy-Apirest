// Appealing to Success and Error functions
const func = require('functions')
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
// By convention we replaced all res.send by res.json to stringify automatically
// and we set both success and error functions (we can find in the node_modules folder)
app.get('/api/v1/members/:id', (req, res) => {
    res.json(func.success(members[(req.params.id)-1].name))
})

app.get('/api/v1/members', (req, res) => {
    // Using req.query ?=max to display the array
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(func.success(members.slice(0, req.quuery.max)))
    } else if (req.query.max != undefined) {
        res.json(func.error('Wrong max value'))
    } else {
        res.json(func.success(members))
        }
    }
)

// Listenning 
app.listen(8080, ()=>{
    console.log('Started on port 8080')
})