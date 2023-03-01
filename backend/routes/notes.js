const express = require('express');
const fetchUser = require('../middlewares/user');
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require("express-validator");

// Fetch notes which belongs to the authenticated user
router.get('/fetchNotes',fetchUser,async (req,res)=>{
    try{
        const notes = await Notes.find({user : req.userId});
        res.send(notes);
    }catch(err){
        res.status(500).send("Internal server error");
    }
})

// Creates a new note
router.post('/addNotes',fetchUser,[
    // Validations
    body("tittle", "Tittle atleast 3 character long").isLength({ min: 3 }),
    body("description", "Description length is too short").isLength({ min: 5 }),
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {tittle,description,tag} = req.body;
        const user = req.userId;
        const notes = new Notes({user,tittle,description,tag})
        notes.save();
        res.send(notes);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})

// Updates an exsting note
router.put('/updateNotes/:id',fetchUser,[
    // Validations
    body("tittle", "Tittle atleast 3 character long").isLength({ min: 3 }),
    body("description", "Description length is too short").isLength({ min: 5 }),
] , async (req,res)=>{
    // 
    const errors = validationResult(req);
    if (req.body.tittle && !errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().filter(e=>e.param ==="tittle") });
    }
    if (req.body.description && !errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array().filter(e=>e.param ==="description") });
    }

    try{
        const {tittle,description,tag} = req.body;
        const user = req.userId;
        // Check note exits
        const notes = await Notes.findById(req.params.id);
        if(!notes){
            return res.status(404).send("Note Not found");
        }
        // Check user owns the note
        if(notes.user.toString() !== user){
            return res.status(401).send("Unauthorized access");
        }

        // Update the note
        const newNote = {};
        if(tittle) newNote.tittle = tittle;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;

        let note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true});
        res.send(note);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})

// deletes the note from the database
router.delete('/deleteNotes/:id',fetchUser,async (req,res)=>{
    try{
        const user = req.userId;
        const notes = await Notes.findById(req.params.id);
        // check note exist
        if(!notes){
            return res.status(404).send("Note Not found");
        }
        // check is authorized user
        if(notes.user.toString() !== user){
            return res.status(401).send("Unauthorized access");
        }

        let note = await Notes.findByIdAndDelete(req.params.id);
        res.send(note);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})


module.exports = router