const mongoose = require("mongoose");

mongoose.model("Todonote",{
    displayname:{
        type: String,
        require: true
    }
})