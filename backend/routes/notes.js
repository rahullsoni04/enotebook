const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')

router.post('/',(req,res)=>{
    clg(req.body)
})

module.exports = router