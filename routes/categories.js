const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Category } = require("../models/Category");
const  { getAllCategory,
    getCategoryById,
    createCategory,
    updateCategoryById ,
    deleteCategoryById
} = require("../controller/categoryController");

router.route("/")
.get(getAllCategory)
.post(createCategory);


router.route("/:id")
.get(getCategoryById)
.put(updateCategoryById)
.delete(deleteCategoryById);

module.exports = router;