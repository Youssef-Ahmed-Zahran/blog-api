const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Category } = require("../models/Category");

// Http Methods / Verbs

/**
*   @desc   Get All Category
*   @route  /api/categories
*   @method  Get
*   @access  public
*/
router.get("/", asyncHandler( async (req,res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
}));


/**
*   @desc   Create New Category
*   @route  /api/categories
*   @method  Post
*   @access  public
*/
router.post("/", asyncHandler( async (req,res) => {
    const newCatg = new Category(req.body);

    const savedCatg = await newCatg.save()
    res.status(200).json(savedCatg);
}));

module.exports = router;