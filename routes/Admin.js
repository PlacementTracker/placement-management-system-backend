const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
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
   
    const newAdmin = new Admin({ 
        
        email:req.body.email,
         password:hash
        });


    

    try {
        const dataToSave = newAdmin.save();
        res.status(201).json(dataToSave)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}
   
    });
});


  


// Login admin
router.post("/login", (request, response) => {
    // check if email exists
    Admin.findOne({ email: request.body.email })
  
      // if email exists
      .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(request.body.password, user.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
  
            //   create JWT token
            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
  
            //   return success response
            response.status(200).send({
              message: "Login Successful",
              email: user.email,
              token,
            });
          })
          // catch error if password does not match
          .catch((error) => {
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });
  

module.exports = router;

