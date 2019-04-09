// Appealing to Success and Error functions
const func = require('functions')
// Appealing to body-parser middleware
const bodyParser = require('body-parser')
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

// for parsing application/json => for more information scroll to the POST method
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

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
})

// Using POST to add new members to the array
// We need to use BodyParser in order to parse the data into the body
app.post('/api/v1/members', (req, res) => {
    // We check if the parameters does exist to add a new member
    if (req.body.name) {

        let member = {
            id: members.length+1,
            name: req.body.name
        }

        members.push(member)

        res.json(func.success(member))

    } else {
        res.json(func.error('no name value'))
    }

})

// Listenning 
app.listen(8080, ()=>{
    console.log('Started on port 8080')
})