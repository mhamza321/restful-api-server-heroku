//const express = require('express') // older way (es5 format). it does not work in module js.
import express from 'express'  // es6 format
import cors from 'cors' // install it as - npm install cors


const app = express() // for decrypting the data
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000  // for deploying on heroku, it is mandatory

// users array for now. later on we will store data in database
let users = [];   // TODO: Replace this with MongoDb

// generate a random number
function randomNumber () { 
  return Math.floor(Math.random() * 10000000000);
}

// There are four types of requests. 1. Get     2. Post     3. Put    4. Delete

/////////////// 1. Create Single User    ////////////////////////
app.post('/user', (req, res) => {

  //users.push(req.body);
  
  let newUser = {
    id: randomNumber(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  users.push(newUser);
  
  res.send("User is created");

  console.log("Create user request called");
  console.log(req.body);
})

/////////////// 2. Get Single User    ////////////////////////
app.get('/user/:userId', (req, res) => {
  
  let userId = req.params.userId;
  let isFound = false;
  for(let i = 0; i < users.length; i++){
    if(users[i].id == userId){
      isFound = true;
      res.send(users[i]);
      break;
    }
  }
  
  if(!isFound){
    res.send("User not found");
  }
  
  console.log("Get single user request recieved");
  
})

/////////////// 3. Get All Users    ////////////////////////
app.get('/users', (req, res) => {
  console.log("Get all users request recieved");
  res.send(users);
  //res.send(users);
})

/////////////// 3. Modify signle User    ////////////////////////
app.put('/user/:userId', (req, res) => {
  
  let userId = req.params.userId;
  let userIndex = -1;

  for(let i = 0; i < users.length; i++) {
    if(users[i].id == userId){
      userIndex = i;

      break;
    }
  }
  
  if(userIndex == -1){
    res.send("User not found");
  }else{

    if(req.body.name){
      users[userIndex].name     = req.body.name;
    }

    if(req.body.email){
      users[userIndex].email    = req.body.email;
    }

    if(req.body.password){
      users[userIndex].password = req.body.password;
    }

    res.send(users[userIndex]);
  }
  
  console.log("Modify user request recieved");

  //res.send("User is modified");
})

/////////////// 4. Delete Signle User    ////////////////////////
app.delete('/user/:userId', (req, res) => {
  
  let userId = req.params.userId;
  let userIndex = -1;

  for(let i = 0; i < users.length; i++) {
    if(users[i].id == userId){
      userIndex = i;

      break;
    }
  }
  
  if(userIndex == -1){
    res.send("User not found");
  }else{
    users.splice(userIndex, 1);
    res.send("Single user is deleted.");
  }
  
  
  
  console.log("Delete user request recieved");

  //res.send("Single user is deleted.");
})

/////////////// 5. Delete All Users    ////////////////////////
app.delete('/users', (req, res) => {
  
  users = [];  // Deleting all users
  
  console.log("Delete all users request recieved");

  res.send("All users deleted.");
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