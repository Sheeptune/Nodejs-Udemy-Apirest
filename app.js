// Appealing to Success and Error functions
// USED TO BE > const func = require('functions')
const {success, error} = require('functions')

// Appealing to body-parser middleware
const bodyParser = require('body-parser')
// Appealing to Express throught "app"
const express = require('express')
const app = express()
const morgan = require('morgan')
// We use the config.json file to change the port without touching this code
const config = require('./config')

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

// ROUTER ** > Creation of a router for the branch "members"
// The router is linked to Express
let MembersRouter = express.Router()

// Appealing to Morgan to get logging request details
app.use(morgan('dev'))

// for parsing application/json => for more information scroll to the POST method
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// ROUTER **
MembersRouter.route('/:id')

    // Url creation and parameters setting
    // By convention we replaced all res.send by res.json to stringify automatically
    // and we set both success and error functions (we can find in the node_modules folder)
    // .get is automatically considering MembersRouter !!!
    .get((req, res) => {

        let index = getIndex(req.params.id);

        // We will get the members by using the getIndex function
        if (typeof(index) == 'string') {
            res.json(error(index))
        } else {

            res.json(success(members[index]))
        }
    })

    //Using PUT to modify members
    .put((req, res) =>{

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

    // Using DELETE to delete members and their id
    .delete((req, res)=>{

        let index = getIndex(req.params.id);

        // does the id already exist

        if (typeof(index) == 'string') {
            res.json(error(index))
        } else {
            members.splice(index, 1)
            res.json(success(members))
        }
    })

// ROUTER **
MembersRouter.route('/')

    // Get all the members and their id
    .get((req, res) => {
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
    .post((req, res) => {
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
                id: createID(),
                name: req.body.name
                }

                members.push(member)
                res.json(success(member))
            }
        }
    })

// ROUTER ** > MembersRouter is taking action over '/api/v1/members'
// We replace '/api/v1/' by config.rootAPI
app.use(config.rootAPI+'members', MembersRouter)

// Listenning 
// We replace 8080 by config.port
app.listen(config.port, ()=>{
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

// We will use this function upon the POST method to avoid id duplication
function createID(){
    // we get back the last members and its id + 1 to get a new id
    return members[members.length-1].id + 1
}