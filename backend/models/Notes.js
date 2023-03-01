const mongoose = require('mongoose');
const {Schema} = mongoose;

const notesSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        defaul : "No description"
    },
    tag : {
        type : String,
        defaul : "No tag"
    },
    tag : String,
    date : {
        type : Date,
        default : Date.now
    }
  });

  module.exports = mongoose.model('Notes', notesSchema);