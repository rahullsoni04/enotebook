const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const fetchUser = require("../middlewares/user");
const router = express.Router();
const JWT_SECRET = "rahul";

// Sign up Endpoint

router.post(
  "/signup",
  [
    // Validation for email and password
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be of minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name,email, password } = req.body;
    try {

        // Check user already exists
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        
        // Encryption 
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        
        // Create a new user
        user = await User.create({
          name: name,
          email: email,
          password: hashPass,
        });
        
        // Auth token
      const authToken = jwt.sign({ id: user.id }, JWT_SECRET);
      console.log(authToken);
      res.json({authToken});
      
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// Login Endpoint

router.post(
  "/login",
  [
    // Validation for email and password
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Field cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

      // Check user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Compare password
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      const authToken = jwt.sign({ id: user.id }, JWT_SECRET);
      console.log(authToken);

      res.send({authToken});

    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// User Details Endpoinit

router.post(
  "/getUser",fetchUser,async (req, res) => {
  
    try {
      const user = await User.findById(req.userId).select("-password");
      res.send(user);
      
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
