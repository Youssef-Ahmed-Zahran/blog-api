const router = require("express").Router();
const { 
    getAllPosts,
    getPostById,
    createNewPost,
    updateUserById,
    deleteUserById 
} = require("../controller/postController");

router.route("/")
.get(getAllPosts)
.post(createNewPost);

router.route("/:id")
.get(getPostById)
.put(updateUserById)
.delete(deleteUserById);

module.exports = router;