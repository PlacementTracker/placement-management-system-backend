const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/student');
const multer = require('multer');

const router = express.Router();
/*
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
*/
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/signup', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'resumeFile', maxCount: 1 }, { name: 'marksheetFile', maxCount: 1 }]), async (req, res) => {
    

        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err)
            {
                return res.status(500).json({
                    eroor:err
                })
            }
            else{
                try{
        const { name, email, password, rollNo, contactNo, batch, skills, cgpa } = req.body;

        // Check if email and roll no already exist
       

        const student = new Student({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            rollNo:req.body.rollNo,
            contactNo:req.body.contactNo,
            batch:req.body.batch,
            skills:req.body.skills,
            cgpa:req.body.cgpa,
            photo: req.files.photo ? req.files.photo[0].filename : '',
            resumeFile: req.files.resumeFile ? req.files.resumeFile[0].filename : '',
            marksheetFile: req.files.marksheetFile ? req.files.marksheetFile[0].filename : ''
        });

     student.save();

        return res.status(201).json({ message: 'Student created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}
});
});


  


module.exports = router;
