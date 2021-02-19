const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken');

// @desc Auth user & get token

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: `${generateToken(user._id)}`,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc Create new user

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: `${generateToken(user._id)}`,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error('User not found');
	}
});

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updateUser = await user.save();
		res.json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
			token: `${generateToken(updateUser._id)}`,
		});
	} else {
		res.status(401);
		throw new Error('User not found');
	}
});

module.exports = { authUser, getUserProfile, registerUser, updateUserProfile };
