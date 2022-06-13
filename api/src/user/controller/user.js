require("../../mongooseConnection");
require("dotenv").config();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const confirmPassword = req.body.password === req.body.confirm_password;
    if (confirmPassword) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updatedUser = { ...req.body, password: hashedPassword };
      const user = new User(updatedUser);
      await user.save();
      res.status(201).json({
        status: true,
        message: "Registration successful",
        data: user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const passwordVerification = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordVerification) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(201).json({
          status: true,
          message: "Login successful",
          data: { user: user, token: token },
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

exports.logout = (req, res) => {};

exports.profile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user) {
      res.status(201).json({
        status: true,
        message: "Registration successful",
        data: user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};
