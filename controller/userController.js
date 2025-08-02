const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const { Post } = require("../models/Post");

// Http Methods / Verbs

/**
*   @desc   Get All User
*   @route  /api/users
*   @method  Get
*   @access  private (only admin)
*/
const getAllUsers = asyncHandler( async (req,res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
});

/**
*   @desc   Get User By Id
*   @route  /api/users/:id
*   @method  Get
*   @access  private (only admin & User himself)
*/
const getUserById = asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id);
    !user && res.status(400).json({message: "user not found"});

    const { password, ...others } = user._doc;

    res.status(200).json(others);
});

/**
*   @desc   Update User By Id
*   @route  /api/users/:id
*   @method  Put
*   @access  private (only admin & User himself)
*/
const updateUserById = asyncHandler( async (req,res) => {
        let updatedUser = await User.findById(req.params.id);
        if (!updatedUser) {
            return res.status(400).json({message: "user not found"});
        }

        if (req.body.userId === req.params.id) {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
        }, { new: true }).select("-password");

        res.status(200).json(updatedUser);
    } else {
        res.status(401).json({message: "You can update only your acconut!"});
    }
});

/**
*   @desc   Delete User By Id
*   @route  /api/users/:id
*   @method  Delete
*   @access  private (only admin & User himself)
*/
const deleteUserById = asyncHandler( async (req,res) => {
        let user = await User.findById(req.params.id).select("-passsword");
        if (req.body.userId === req.params.id) {
        if (user) {
            await Post.deleteMany({username: user.username});
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "user has been deleted successfully" });
        } else {
        res.status(404).json({message: "user not found."});
        }
    }
});

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
}
