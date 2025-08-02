const asyncHandler = require("express-async-handler");
const { Category } = require("../models/Category");

// Http Methods / Verbs

/**
 *   @desc   Get All Category
 *   @route  /api/categories
 *   @method  Get
 *   @access  public
 */
const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

/**
 *   @desc   Get Category By Id
 *   @route  /api/categories/:id
 *   @method  Get
 *   @access  public
 */
const getCategoryById = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(400).json({ message: "the category not found!" });
  }
});

/**
 *   @desc   Create New Category
 *   @route  /api/categories
 *   @method  Post
 *   @access  private (Only Admin)
 */
const createCategory = asyncHandler(async (req, res) => {
  const newCatg = new Category(req.body);

  const savedCatg = await newCatg.save();
  res.status(200).json(savedCatg);
});

/**
 *   @desc   Update Category By Id
 *   @route  /api/categories/:id
 *   @method  Put
 *   @access  private (Only Admin)
 */
const updateCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    const updateCatg = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCatg);
  } else {
    res.status(400).json({ message: "the category not found!" });
  }
});

/**
 *   @desc   Delete Category By Id
 *   @route  /api/categories/:id
 *   @method  Delete
 *   @access  private (Only Admin)
 */
const deleteCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    const deletedCatg = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "category has been deleted." });
  } else {
    res.status(400).json({ message: "the category not found!" });
  }
});

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
