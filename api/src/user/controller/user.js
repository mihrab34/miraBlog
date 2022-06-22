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

const createTokens = (user) => {
  try {
    if (user) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });
      delete payload.email;
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        status: true,
        message: "Login successful",
        data: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "User Not Found",
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
          username: user.username,
          email: user.email,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "3m",
        });
        delete payload.email;
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
          expiresIn: "1h",
        });
        delete user.password;
        user.token = refreshToken;
        await user.save();
        return res.status(200).json({
          status: true,
          message: "Login successful",
          data: {
            user,
            accessToken,
            refreshToken,
          },
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "User Not Found",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const verifyRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET
    );
    const user = await User.findOne({ username: verifyRefreshToken.username });
    if (user) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3m",
      });
      delete payload.email;
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        status: true,
        message: "Refresh successful",
        data: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: true,
      message: error.message,
    });
  }
};

exports.logout = async(req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({ token: refreshToken });
    if (user) {
      user.token = "";
      await user.save();
      res.status(204).json({message: "LogOut Successful"})
    }else {
       res.status(204).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
  
};
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
