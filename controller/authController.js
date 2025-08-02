const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 *   @desc   Register New User
 *   @route  /api/auth/register
 *   @method  Post
 *   @access  public
 */
module.exports.register = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "this user is already exsist!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
  });

  const result = await user.save();
  const token = user.generateToken();
  const { password, ...others } = result._doc;

  res.status(201).json({ others, token });
});

/**
 *   @desc   Login User
 *   @route  /api/auth/login
 *   @method  Post
 *   @access  public
 */
module.exports.login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  !user && res.status(400).json({ message: "Wrong credentials!" });

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  !isPasswordMatch && res.status(400).json({ message: "Wrong credentials!" });

  const token = user.generateToken();
  const { password, ...others } = user._doc;

  res.status(200).json({ others, token });
});
