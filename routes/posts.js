const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  getAllPosts,
  getPostById,
  createNewPost,
  updatePostById,
  deletePostById,
} = require("../controller/postController");

router.route("/").get(verifyTokenAndAdmin, getAllPosts).post(createNewPost);

router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getPostById)
  .put(verifyTokenAndAuthorization, updatePostById)
  .delete(verifyTokenAndAuthorization, deletePostById);

module.exports = router;
