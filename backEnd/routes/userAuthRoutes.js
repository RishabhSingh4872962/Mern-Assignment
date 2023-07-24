const express = require("express");
const router = express.Router();
const {  validationResult } = require("express-validator");
const { userModel } = require("../dataBases/userDB");

const validateUserData = require("../validations/userSignUp");
const createToken = require("../utils/jwtToken");
const authUser = require("../middlewares/authUser");
const asyncHandler = require('../middlewares/asyncHandler'); // Create this middleware to handle errors


// Create the user with valid credentials

router.post("/users", validateUserData, asyncHandler(async (req, res, next) => {

    const { errors } = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).send({ success: false, msg: "Enter valid credentials" });
    }

    const alreadyUser = await userModel.findOne({ email: req.body.email });
    if (alreadyUser) {
      return res.status(400).send({ success: false, msg: "User already has an account. Please login." });
    }

    const user = await userModel.create(req.body);
    const token = createToken({
      email: req.body.email,
      id: user._id,
    });
    res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 });
    res.status(201).send({ success: true, msg: "User created successfully", token: token });

}));

// Login the user
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).send({ success: false, msg: 'Invalid credentials' });
  }

  const token = createToken({
    email: req.body.email,
    id: user._id,
  });
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 });
  res.status(200).send({ success: true, msg: 'User login successfully', token: token });
}));

// Get single user
router.get("/user/:id", authUser,asyncHandler( async (req, res, next) => {
  
    const { id } = req.params;
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    res.status(200).send({ success: true, user });
 
}));

// Get all users with pagination and sorting
router.get("/users", authUser, asyncHandler(async (req, res, next) => {
  
  const perPage = 5;
  const page = parseInt(req.query.page) || 1;
  const sortField = req.query.sortField || "_id";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

  const searchQuery = {};
  if (req.query.name) {
    searchQuery.firstName = { $regex: req.query.name, $options: "i" };
  }

  const totalUsers = await userModel.countDocuments(searchQuery);
  const users = await userModel.find(searchQuery).sort({ [sortField]: sortOrder }).skip((page - 1) * perPage).limit(perPage).select("-password");
  res.status(200).send({ success: true, users, totalUsers });

}));

// Logout
router.delete("/logout", authUser, (req, res) => {
  res.clearCookie("token").status(200).send({ success: true, msg: "User logout successfully" });
});

// Delete the user
router.delete("/deluser/:id", authUser,asyncHandler( async (req, res, next) => {
 
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    await user.remove();
    res.clearCookie("token").status(202).send({ success: true, msg: "User deleted successfully" });
  
}));

// Update the user data
router.put("/update/:id", authUser, validateUserData,asyncHandler( async (req, res, next) => {
 
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).send({ success: false, msg: "Enter valid credentials" });
    }

    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    res.status(201).send({ success: true, msg: "User updated successfully", user });
 
}));

module.exports = router;
