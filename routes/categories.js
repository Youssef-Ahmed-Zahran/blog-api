const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Category } = require("../models/Category");

// api/categories
router.get("/", asyncHandler( async (req,res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
}));

// api/categories
router.post("/", asyncHandler( async (req,res) => {
    const newCatg = new Category(req.body);

    const savedCatg = await newCatg.save()
    res.status(200).json(savedCatg);
}));

module.exports = router;