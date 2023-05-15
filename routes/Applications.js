const express = require('express');
const jwt = require('jsonwebtoken');
const Application = require('../models/application');
const sendMails = require('../Utils/senMails');

const router = express.Router();



// Apply for a job
router.post('/applications', authenticateStudent, async (req, res) => {
  try {
    const { jobId, coverLetter, resumeUrl } = req.body;

    const application = await Application.create({
      job: jobId,
      student: req.studentId,
      coverLetter,
      resumeUrl,
    });

    // Get the student's email address from the database
    const student = await Student.findById(req.studentId);
    const to = student.email;

    // Send an email to the student
    const subject = 'Application submitted';
    const text = 'Your job application has been submitted successfully.';
    await sendMails(to, subject, text);

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;