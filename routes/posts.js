const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  getAllPosts,
  getPostById,
  createNewPost,
  updateUserById,
  deleteUserById,
} = require("../controller/postController");

router.route("/").get(verifyTokenAndAdmin, getAllPosts).post(createNewPost);

router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getPostById)
  .put(verifyTokenAndAuthorization, updateUserById)
  .delete(verifyTokenAndAuthorization, deleteUserById);

module.exports = router;
