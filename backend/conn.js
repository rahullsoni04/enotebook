const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
require('dotenv').config();


const mongoURI = process.env.MONGODB_URI;

const dbCon =() =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to DB");
    })
}

module.exports = dbCon;