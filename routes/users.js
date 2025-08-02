const router = require("express").Router();
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require("../controller/userController");


// api/users
router.get("/", getAllUsers);

// api/users/:id
router.route("/:id")
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

module.exports = router;