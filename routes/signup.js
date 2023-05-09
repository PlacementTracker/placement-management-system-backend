const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/student');

const router = express.Router();

router.post('/signup',(req, res) => {
  
    bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err)
    {
        return res.status(500).json({
            eroor:err
        })
    }
    else{
     console.log(req.body);
    // Create new student document
    const newStudent = new Student({ 
        name: req.body.name,
        email:req.body.email,
        stream:req.body.stream,
         rollNo: req.body.rollNo,
         password:hash
        });

    // Save student to database
    

    try {
        const dataToSave = newStudent.save();
        res.status(201).json(dataToSave)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}
   
    });
});


  


module.exports = router;
