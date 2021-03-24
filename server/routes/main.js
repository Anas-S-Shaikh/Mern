const express = require("express");
const router = express.Router();
const User = require("../models/user");

// to get all users data

router.get("/allusers", async (req, res) => {
  try {
    const allUsers = await User.find().sort({ DateOfBirth: -1 });
    if (allUsers.length <= 0)
      return res.json({ message: `no user data found` });
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
});

//to get specific user data

router.get("/allusers/:firstname", async (req, res) => {
  try {
    const firstname = req.params.firstname;
    const searchUser = await User.find({ firstname });
    if (!searchUser) return res.json({ message: `no user found` });
    res.json(searchUser);
  } catch (error) {
    console.log(error);
  }
});

// find by id
router.get("/allusers/edit/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const searchUser = await User.findById(id);
    if (!searchUser) return res.json({ message: `no user found` });
    res.json(searchUser);
  } catch (error) {
    console.log(error);
  }
});

//to update the data
router.patch("/allusers/edit/:id", async (req, res) => {
  const id = req.params.id;
  // console.log('updating');
  try {
    const searchUser = await User.findByIdAndUpdate(id,req.body,{new:true});
    if (!searchUser) return res.json({ message: `no user found` });
    res.json(searchUser);
  } catch (error) {
    console.log(error);
  }
});


//to create new user data

router.post("/newuser", async (req, res) => {
  const { firstname, lastname, email, DateOfBirth, bio } = req.body;
  if (!firstname || !lastname || !email || !DateOfBirth || !bio) {
    // console.log(`please enter all field`);
    return res.json({ message: `please enter all field` });
  }
  //   console.log(req.body);
  try {
    const user = new User({
      firstname,
      lastname,
      email,
      DateOfBirth,
      bio,
    });
    const userAdded = await user.save();
    res.json(userAdded);
  } catch (error) {
    console.log(error);
  }
});

//to delete user

router.delete("/delete/:id", async (req, res) => {
  
  const _id = req.params.id;
  // console.log(_id);
  try {
    const searchUser = await User.findByIdAndDelete(_id);
    if (!searchUser) return res.json({ message: `no user found` });
    res.json(searchUser);
  } catch (error) {
    console.log(error);
  }
  // res.send(_id)
});

module.exports = router;
