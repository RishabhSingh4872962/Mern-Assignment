const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { userModel } = require("../dataBases/userDB");

const validateUserData = require("../validations/userSignUp");

const createToken = require("../utils/jwtToken");

const authUser = require("../middlewares/authUser");

// create the user with mant credensials
router.post("/users", validateUserData,[ body("password").isLength({ min: 6, max: 15 }).notEmpty().isString()], async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).send({ msg: "enter the valid credensials" });
    }

    const alreadyUser = await userModel.findOne({ email: req.body.email }); // check already user
    if (alreadyUser) {
      return res
        .status(400)
        .send({ msg: "user already have a account please login " });
    }
    const user = await userModel.create(req.body);
    const token = createToken({
      email: req.body.email,
      id: user._id,
    });
    res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 }); // create token
    res
      .status(201)
      .send({ success: true, msg: "user created successfully", token: token });
  } catch (error) {
  return  res.status(500).send(error);
  }
});

// login the user 
router.post(
  "/login",
  [
    body("email").trim().isEmail().notEmpty().isString(),
    body("password").isLength({ min: 6, max: 15 }).notEmpty().isString(),
  ],
  async (req, res, next) => {   
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
          return res.status(400).send({ success: false, msg: "user not found" });
        }
        if (user.email != email || user.password != password) {
          return res
            .status(400)
            .send({ success: false, msg: "Enter the valid credensials" });
        }
        const token = createToken({
          email: req.body.email,
          id: user._id,
        });
        res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 });
        res
          .status(200)
          .send({ success: true, msg: "user login successfully", token: token });
      
 
}
);

// get single user

router.get("/user/:id", authUser, async (req, res, next) => {
 try {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id }, { password: 0 });
    res.status(200).send({ success: true, user });
 } catch (error) {
    res.status(500).send(error);
 }
 
});


// get all users
router.get("/users", authUser, async (req, res, next) => {
 try {
    const perPage = 5;
    const page = req.query.page || 1;

    let searchQuery={}

    if (req.query.name) {
      searchQuery.firstName={  $regex :req.query.name ,$options:'i'}
    }
    const allUsers=await userModel.find({})
    const user = await userModel
      .find(searchQuery, { password: 0 }).skip(( page-1) * perPage).limit(perPage)
      
    res.status(200).send({ success: true, user,dataLength:allUsers.length });
 } catch (error) {
    res.status(500).send(error);
 }
});

// logout 
router.delete("/logout", authUser, async (req, res, next) => {
  res
    .status(200)
    .clearCookie("token")
    .send({ success: true, msg: "user logout succesfully" });
});


// delete the user
router.delete("/deluser/:Id", authUser, async (req, res, next) => {
  try {
    const {Id}=req.params
    const user=await userModel.findOne({ _id: Id })
    if (!user) {
      return res.status(404).send({msg:"user not found"})
    }
  await userModel.deleteOne({ _id: Id });
  res
    .status(202)
    .clearCookie("token")
    .send({ success: true, msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update the user data
router.put("/update/:id", authUser, validateUserData, async (req, res, next) => {

try {
  const { errors } = validationResult(req);
  console.log(errors);
  if (errors.length > 0) {
    return res.status(400).send({ msg: "enter the valid credensials" });
  }
    const { id } = req.params;
    console.log(id);
    const user = await userModel.findOne({ _id: id}).select('-password');
    console.log(user);
    Object.assign(user, req.body);
    console.log(user);
    await user.save();
    res
      .status(201)
      .send({ success: true, msg: "user updated successfully", user });
 
} catch (error) {
  res.status(500).send(error);
}
});

module.exports = router;
