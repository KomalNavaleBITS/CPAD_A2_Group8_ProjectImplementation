const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

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
require("./Todonote")
const Todonote =mongoose.model("Todonote");

const {MongoClient} = require('mongodb');
const { writer } = require('repl');


const uri ="mongodb+srv://ToDoUser:ToDoPassword@cluster0.xzi5d.mongodb.net/Tasks?retryWrites=true&w=majority";


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



app.get('/gettasks', (req, res) => {

  Todonote.find().then((todonotes)=> {
      res.json(todonotes)
  }).catch(err => {
      if(err){
          throw err;
      }
  })

})

app.get("/task/:id", (req,res) =>{
    Todonote.findById(req.params.id).then((task) => {
        if(task){
            res.json(task)
        }else{
            res.send("Invalid ID!")
        }
    }).catch((err) => {
        if(err){
            throw err;
        }
    } )
})



app.post('/addtask', (req, res) => {
    console.log('Adding task to task list');

    const displayname = req.body.displayname;

    var newtodo= {
        displayname: displayname
    }

    var todonote= new Todonote(newtodo);

    // todonote.save().then(() => {
    //     console.log("New Book Created")
    // }).catch((err) => {
    //     if(err){
    //         throw err;
    //     }
    // })
    //
    todonote.save(function(err,task){
        console.log("A new task is created");
        res.send(task);
        
    })
    //
    // var n = new Chat();
    // n.name = "chat room";
    // n.save(function(err,room) {
    // console.log(room.id);
//});
//
    

   // res.send("A new task created");


});



app.delete("/deletetask/:id",(req,res) =>{
    var query = {'_id': req.params.id};

    Todonote.findOneAndRemove(query).then(()=>{
        res.send("TodoNote removed");
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.post("/edittask/:id",(req,res) =>{

    var query = {'_id': req.params.id};

    const displayname = req.body.displayname;
    var editedtodo= {
        displayname: displayname
    }

    Todonote.findOneAndUpdate(query, editedtodo,{new: true}).then((data) =>{
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