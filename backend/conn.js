const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const mongoURI = "mongodb://localhost:27017/enotebook";

const dbCon =() =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to DB");
    })
}

module.exports = dbCon;