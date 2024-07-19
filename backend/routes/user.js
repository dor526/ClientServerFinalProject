const express = require("express");
const axios = require("axios");

const router = express.Router();

const User = require("../models/user"); // User model

/**
 * Route for creating a new user.
 */
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    var savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    var email = req.body.email;
    var password = req.body.password;

    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });

    if (!user) {
      // Return a 404 Not Found status if the user is not found
      return res.status(404).json({ error: "User not found" });
    }

    if (password != user.password) {
      // Return a 401 Unauthorized status if the password is incorrect
      return res.status(401).json({ error: "Incorrect password" });
    }

    // User validated successfully
    res.status(200);
  } catch (error) {
    console.log(error);
    // Return a 500 Internal Server Error status for any database access errors
    return res.status(500).json({
      error: "An error occurred while accessing the database",
      errorDetails: error,
    });
  }
  res.json({});
});

module.exports = router;
