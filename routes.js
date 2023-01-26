'use strict';

//Import modules
const express = require('express');


//express router
const router = express.Router();


//Import models
const { User } = require('./models').User;
const { Course } = require('./models').Course;
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require("./middleware/auth-user");


/***************/
/* USER ROUTES */
/***************/

//Get all properties and values for the currently authenticated User

router.get("/users",authenticateUser, asyncHandler(async(req,res) => {
    const user = req.currentUser;

    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
 })
);

//create new use , setting location header to "/" 




module.exports = router;