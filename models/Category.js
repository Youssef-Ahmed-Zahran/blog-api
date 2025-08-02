const Joi = require("joi");
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Category Model
const Category = mongoose.model("Category", CategorySchema);

function validateCreateCategory(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    user: Joi.string().required(),
  });

  return schema.validate(obj);
}

function validateUpdateCategory(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50),
    user: Joi.string(),
  });

  return schema.validate(obj);
}

module.exports = {
  Category,
  validateCreateCategory,
  validateUpdateCategory,
};
