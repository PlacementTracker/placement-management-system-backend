const express = require('express');
const jwt = require('jsonwebtoken');
const Job = require('../models/job');
const multer = require('multer');
const router = express.Router();

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




// Post a new job
router.post('/jobs', upload.fields([{ name: 'jdFile',maxCount: 1 }]), async (req, res) => {
  try {
    

    // Create a new job using the provided data and the admin ID from JWT token
    const job = await Job.create({
        title: req.body.title,
        jobId: req.body.jobId,
        description: req.body.description,
        location: req.body.location,
        salary: req.body.salary,
        companyName: req.body.companyName,
        companyDesc: req.body.companyDesc,
        jdFile: req.files.jdFile ? req.files.jdFile[0].filename : '',
        applyLink: req.body.applyLink,
      
    });

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
