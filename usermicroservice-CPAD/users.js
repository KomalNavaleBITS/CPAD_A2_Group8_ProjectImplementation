const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
var cors = require('cors');

const port = process.argv.slice(2)[0];
const app = express();

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'DELETE',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

app.use(bodyParser.json());

const mongoose = require('mongoose');
require("./User")
const User =mongoose.model("User");

//const {MongoClient} = require('mongodb');


const uri ="mongodb+srv://ToDoUser:ToDoPassword@cluster0.xzi5d.mongodb.net/Users?retryWrites=true&w=majority";


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })



app.get('/getusers', (req, res) => {

  User.find().then((users)=> {
      res.json(users)
  }).catch(err => {
      if(err){
          throw err;
      }
  })

})

app.get("/user/:id", (req,res) =>{
    User.findById(req.params.id).then((user) => {
        if(user){
            res.json(user)
        }else{
            res.send("Invalid ID!")
        }
    }).catch((err) => {
        if(err){
            throw err;
        }
    } )
})



app.post('/adduser', (req, res) => {
    console.log('Adding new user');

    const name = req.body.name;

    var newuser= {
        name: name
    }

    var user= new User(newuser);

    // user.save().then(() => {
    //     console.log("New User Created")
    // }).catch((err) => {
    //     if(err){
    //         throw err;
    //     }
    // })

    user.save(function(err,user){
        console.log("New User Created")
        res.send(user);
        
    })

    //res.send("A new user created");


});



app.delete("/deleteuser/:id",(req,res) =>{
    var query = {'_id': req.params.id};

    User.findOneAndRemove(query).then(()=>{
        res.send("User removed");
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.post("/edituser/:id",(req,res) =>{

    var query = {'_id': req.params.id};

    const name = req.body.name;
    var editedname= {
        name: name
    }

    User.findOneAndUpdate(query, editedname,{new: true}).then((data) =>{
        if(data === null){
            throw new Error(' Not updated');
        }
        res.json({ message: 'updated!' })

    }).catch( (error) => {

        console.log(error);
    });

})



console.log(`createtask service listening on port ${port}`);
app.listen(port);