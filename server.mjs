//const express = require('express') // older way (es5 format). it does not work in module js.
import express from 'express'  // es6 format
import cors from 'cors' // install it as - npm install cors


const app = express() // for decrypting the data
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000  // for deploying on heroku, it is mandatory

// users array for now. later on we will store data in database
let users = [];


// There are four types of requests. 1. Get     2. Post     3. Put    4. Delete

/////////////// 1. Create User    ////////////////////////
app.post('/user', (req, res) => {

  users.push(req.body);
  res.send("User is created");

  console.log("Create user request called");
  console.log(req.body);
})

/////////////// 2. Get User    ////////////////////////
app.get('/user', (req, res) => {
  console.log("Get all users request recieved");
  res.send(users);
  //res.send(users);
})

/////////////// 3. Modify User    ////////////////////////
app.put('/user', (req, res) => {
  console.log("Modify user request recieved");

  res.send("User is modified");
})

/////////////// 4. Delete User    ////////////////////////
app.delete('/user', (req, res) => {
  console.log("Delete user request recieved");

  res.send("User is deleted.");
})

app.get('/', (req, res) => {
  console.log("Aik request server per i.")
  res.send('Hello World!')
})

app.get('/profile', (req, res) => {
  console.log('A request recieved on profile page');
  res.send("Profile page loaded");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})