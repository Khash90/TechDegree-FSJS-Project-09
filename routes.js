'use strict';

//Import modules
const express = require('express');


//express router
const router = express.Router();


//Import models
const { User, Course } = require('./models');
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require("./middleware/auth-user");


/***************/
/* USER ROUTES */
/***************/

//Get all properties and values for the currently authenticated User

router.get('/users', authenticateUser ,asyncHandler(async(req,res) => {

    const user = req.currentUser;
    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
 })
);

//create new user , setting location header to "/" 
router.post("/users", asyncHandler(async(req,res) => {
    try {
        await User.create(req.body);
        res.location("/");
        res.status(201).end();
    } catch (error) {
        if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
            const errors = error.errors.map((err) => err.message);
            res.status(400).json({ errors })
        } else {
            throw error;
        }
     }
  })
);



module.exports = router;