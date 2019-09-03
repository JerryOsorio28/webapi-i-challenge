// implement your API here
const express = require('express');

const server = express();

const Db = require('./data/db.js');

server.use(express.json())// <-- teaches express to parse JSON

//See a list of users 
server.get('/api/users', (req, res) => {
    Db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({
            message: "The users information could not be retrieved."
        })
    })
})

//See a specific user in the list
server.get('/api/users/id', (req, res) => {
    Db.find()
    .then(user => {
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The user information could not be retrieved."
        })
    })
})

//create a new user
server.post('/api/users', (req, res) => {

    const userInformation = req.body;

    Db.add(userInformation)
    .then( user => {
        if(user){
            res.status(201).json(user)
        }else{
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    })
})
//delete a user
server.delete('/api/users/:id', (req, res) => {

    const userId = req.params.id;

    Db.remove(userId)
    .then( user => {
        if(user){
            res.status(200).json({
                message: "User deleted sucessfully"
            })
        }else{
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The user could not be removed"
        })
    })
})

//update a user
server.put('/api/users/:id', (req, res) => {

    const { id } = req.params.id;
    const changes = req.body;

    Db.update(id, changes)
    .then( updated => {
        if (updated){
            res.status(200).json(updated)
        }else{
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The user information could not be modified." 
        })
    })
})

server.listen(3000, () => console.log('API running on port 3000'))