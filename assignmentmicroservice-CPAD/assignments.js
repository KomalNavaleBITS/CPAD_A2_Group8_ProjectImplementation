const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios')
const port = process.argv.slice(2)[0];
const app = express();
const cors = require('cors');

app.use(bodyParser.json());

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

const mongoose = require('mongoose');
require("./Assignment")
const Assignment =mongoose.model("Assignment");

//const {MongoClient} = require('mongodb');



//const tasksService = 'http://192.168.1.220:3434/';
//const usersService = 'http://192.168.1.220:3535/';
//const tasksService = 'http://192.168.29.184:3434/';
//const usersService = 'http://192.168.29.184:3535/';
const tasksService = 'http://localhost:3434/';
const usersService = 'http://localhost:3535/';
const uri ="mongodb+srv://ToDoUser:ToDoPassword@cluster0.xzi5d.mongodb.net/Assignments?retryWrites=true&w=majority";


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



app.get('/getassignments', (req, res) => {

  Assignment.find().then((assignments)=> {
      res.json(assignments)
  }).catch(err => {
      if(err){
          throw err;
      }
  })

})

app.get('/getassignmentdetail/:id', (req, res) => {

    Assignment.findById(req.params.id).then((assignment)=> {
        //res.json(assignments)
        //
axios.get(tasksService + "task/" + assignment.taskid).then((task)=>{
    var assignmentObj = {assignmentid: req.params.id, taskname: task.data.displayname,username: '' }

    // console.log(assignmentObj);

    axios.get(usersService + "user/" + assignment.userid).then((user) => {
        assignmentObj.username = user.data.name
        res.json(assignmentObj)
    })
})
        //
    }).catch(err => {
        if(err){
            throw err;
        }
    })
  
  })



app.post('/addassignment', (req, res) => {
    console.log('Adding new assignment');

    const taskid = req.body.taskid;
    const userid = req.body.userid;

    var newassignment= {
        taskid : req.body.taskid,
        userid : req.body.userid
    }

    var assignment= new Assignment(newassignment);

    // user.save().then(() => {
    //     console.log("New User Created")
    // }).catch((err) => {
    //     if(err){
    //         throw err;
    //     }
    // })

    assignment.save(function(err,assig){
        console.log("New Assignment Created")
        res.send(assig);
        
    })

    //res.send("A new user created");


});



app.delete("/deleteassignment/:id",(req,res) =>{
    var query = {'_id': req.params.id};

    Assignment.findOneAndRemove(query).then(()=>{
        res.send("Assignment removed");
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

// app.post("/edituser/:id",(req,res) =>{

//     var query = {'_id': req.params.id};

//     const name = req.body.name;
//     var editedname= {
//         name: name
//     }

//     User.findOneAndUpdate(query, editedname,{new: true}).then((data) =>{
//         if(data === null){
//             throw new Error(' Not updated');
//         }
//         res.json({ message: 'updated!' })

//     }).catch( (error) => {

//         console.log(error);
//     });

// })



console.log(`createtask service listening on port ${port}`);
app.listen(port);