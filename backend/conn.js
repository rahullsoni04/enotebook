const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017";

const dbCon =() =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to DB");
    })
}

module.exports = dbCon;