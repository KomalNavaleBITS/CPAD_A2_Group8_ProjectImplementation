const mongoose = require("mongoose");

mongoose.model("Assignment",{
    userid:{
        type: String,
        require: true
    },
    taskid:{
        type: String,
        require: true
    }
})