const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Category } = require("../models/Category");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("../controller/categoryController");

router.route("/").get(getAllCategory).post(verifyTokenAndAdmin, createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .put(verifyTokenAndAdmin, updateCategoryById)
  .delete(verifyTokenAndAdmin, deleteCategoryById);

module.exports = router;
