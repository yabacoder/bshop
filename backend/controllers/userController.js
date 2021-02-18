const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

// @desc Auth user & get token

const authUser = asyncHandler(async(req, res)=> {
    const { email, password} = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        }) 
    }
})

module.exports = { authUser};