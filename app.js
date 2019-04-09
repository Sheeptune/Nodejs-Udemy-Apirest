// Appealing to Success and Error functions
// USED TO BE > const func = require('functions')
const {success, error} = require('functions')

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

    let index = getIndex(req.params.id);

    // We will get the members by using the getIndex function
    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {

        res.json(success(members[index]))
    }
})

//Using PUT to modify members
app.put('/api/v1/members/:id', (req, res) =>{

    let index = getIndex(req.params.id);

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        // If not a string, save mofication
        //let member = members[index]
        let same = false
        
        // Loop to make sure that the name is not already taken
        for (let i = 0; i < members.length; i++){
            // if the name is already taken & if the id is not the same that is used
            if (req.body.name == members[i].name && req.params.id != members[i].id) {
                same = true
                break
            }     
        } // if same Name true error, if not success
            if (same){
                res.json(error('same name'))
            } else {
                members[index] = req.body.name
                res.json(success(true))
            }
        }
    })

app.get('/api/v1/members', (req, res) => {
    // Using req.query ?=max to display the array
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(success(members.slice(0, req.quuery.max)))
    } else if (req.query.max != undefined) {
        res.json(error('Wrong max value'))
    } else {
        res.json(success(members))
    }
})

// Using POST to add new members to the array
// We need to use BodyParser in order to parse the data into the body
app.post('/api/v1/members', (req, res) => {
    // We check if the parameters does exist to add a new member
    if (req.body.name) {

        let sameName = false

        // Check if the name is available or not
        for (let i = 0; i < members.length; i++){
            if (members[i].name == req.body.name) {
                sameName = true
                break
            }
        }

        // If the name is already taken
        if (sameName) {
            res.json(error('This name is already taken'))
        } else {

            let member = {
            id: members.length+1,
            name: req.body.name
            }

            members.push(member)
            res.json(success(member))
        }
    }
})

// Listenning 
app.listen(8080, ()=>{
    console.log('Started on port 8080')
})

// function to with index according to its id 
function getIndex(id) {
    for (let i = 0; i < members.length; i++){
        if (members[i].id == id)
            return i 
    }
    return 'wrong id'
}