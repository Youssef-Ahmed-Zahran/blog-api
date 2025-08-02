const asyncHandler = require("express-async-handler");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");

// Http Methods / Verbs

/**
 *   @desc   Get All Posts
 *   @route  /api/posts
 *   @method  Get
 *   @access  private (only admin)
 */
const getAllPosts = asyncHandler(async (req, res) => {
  const { user, catName } = req.query;

  let posts;

  if (user && catName) {
    posts = await Post.find({ username, categories: { $in: [catName] } })
      .populate("user", ["_id", "username"])
      .populate("categories", ["_id", "name"]);
  } else {
    posts = await Post.find()
      .populate("user", ["_id", "username"])
      .populate("categories", ["_id", "name"]);
  }

  res.status(200).json(posts);
});

/**
 *   @desc   Get Post By Id
 *   @route  /api/posts/:id
 *   @method  Get
 *   @access  private (only admin & User himself)
 */
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", ["-password"])
    .populate("categories");
  !post && res.status(400).json({ message: "user not found" });

  res.status(200).json(post);
});

/**
 *   @desc   Create New Post
 *   @route  /api/posts
 *   @method  Post
 *   @access  public
 */
const createNewPost = asyncHandler(async (req, res) => {
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const creatPost = new Post(req.body);

  const savePost = await creatPost.save();

  res.status(200).json(savePost);
});

/**
 *   @desc   Update Post By Id
 *   @route  /api/posts/:id
 *   @method  Put
 *   @access  private (only admin & User himself)
 */
const updateUserById = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let updatedPost = await Post.findById(req.params.id);
  if (!updatedPost) {
    return res.status(400).json({ message: "user not found" });
  }

  if (req.body.userId === req.params.id) {
    updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } else {
    res.status(401).json({ message: "You can update only your post!" });
  }
});

/**
 *   @desc   Delete Post By Id
 *   @route  /api/posts/:id
 *   @method  Delete
 *   @access  private (only admin & User himself)
 */
const deleteUserById = asyncHandler(async (req, res) => {
  let deletedPost = await Post.findById(req.params.id).select("-password");
  if (!deletedPost) {
    return res.status(400).json({ message: "user not found" });
  }

  if (req.body.userId === req.params.id) {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted successfully" });
  } else {
    res.status(401).json({ message: "You can delete only your post!" });
  }
});

module.exports = {
  getAllPosts,
  getPostById,
  createNewPost,
  updateUserById,
  deleteUserById,
};
