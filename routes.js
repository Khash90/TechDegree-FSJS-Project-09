'use strict';

//Import modules
const express = require('express');
const auth = require('basic-auth');


const router = express.Router();


//Import models

const { User } = require('./models').User;
const { Course } = require('./models').Course;

//Handler function to wrap each route.
function asyncHandler(cb) {
    return async(req,res,next) => {
        try {
            await cb(req,res,nex);
        } catch (err) {
            //forward error to the global error handler
            next(err);
        }
    }
}



module.exports = router;