const express = require('express');
const Student = require('../models/student');
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

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Get a student by email
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Define update route
router.put('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const updateData = req.body;

        // Find student by ID and update fields
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({ message: 'Student updated successfully', data: updatedStudent });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

//Api for getting student data acc to email
router.get('/studentdata/:email', async (req, res) => {
    try {
        const email = req.params.email;

    
        const student = await Student.findOne({ "email": email });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({ message: 'Student details found', data: student });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;