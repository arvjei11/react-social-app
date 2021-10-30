const router = require("express").Router();
import User from "../models/User";


//bcrypt is a password hashing function with salt
import { genSalt, hash, compare } from "bcrypt";




//registration of new users
router.post("/register", async (req, res) => {
  try {

    //generate a hashed password from user password to store in database
    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);

    //create the new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //saves user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//login auth for users
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("Given user is not found");

    const validPassword = await compare(req.body.password, user.password)
    !validPassword && res.status(400).json("Password is wrong")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

export default router;
