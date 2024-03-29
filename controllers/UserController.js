const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const uploader = require('../utils/imageUploader');
const e = require('express');



exports.signUp = [uploader.single('image'), async (req, res, next) => {
   try {
      const { email, password, confirmPassword, firstName, lastName } = req.body;
      const image = req.file.path

      if (password !== confirmPassword) {
         throw new Error("Passwords don't match")
      }

      const user = new User({
         email,
         password,
         firstName,
         lastName,
         image
      })

      await user.save();

      user.password = undefined;
      return res.status(201).json({ message: "Your account has been created successfully", user: user, success: true })

   } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
         next(new Error('Email is already in use'));
      }
      next(error);
   }
}]

exports.login = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email }).select('+password');
      if (!user) {
         throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         throw new Error('Password is wrong');
      }

      const payload = {
         _id: user._id,
         email: user.email
      }

      const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, { expiresIn: 3600 })

      if (!token) {
         throw new Error('Something went wrong with token');
      }

      user.password = undefined;

      return res.status(200).json({
         user: user,
         token,
         success: true,
      });

   } catch (error) {
      next(error);
   }
}

exports.getProfile = async (req, res, next) => {
   try {
      const user = req.user;
      return res.status(200).json({ user, success: true })
   } catch (error) {
      next(error)
   }
}

exports.getUsers = async (req, res, next) => {
   try {
      const users = await User.find();
      return res.status(200).json({ users, success: true })
   } catch (error) {
      next(error)
   }
}

exports.getUserById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id })
      return res.status(200).json({ user, success: true })
   } catch (error) {
      next(error)
   }
}