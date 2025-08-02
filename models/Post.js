const Joi = require("joi");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

// Post Model
const Post = mongoose.model("Post", PostSchema);

function validateCreatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    user: Joi.string().required(),
    categories: Joi.array().required(),
  });

  return schema.validate(obj);
}

function validateUpdatePost(obj) {
  const schema = Joi.object({
    title: Joi.string(),
    desc: Joi.string(),
    user: Joi.string(),
    categories: Joi.array(),
  });

  return schema.validate(obj);
}

module.exports = {
  Post,
  validateCreatePost,
  validateUpdatePost,
};
