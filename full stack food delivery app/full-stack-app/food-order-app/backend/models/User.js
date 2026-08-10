const mongoose = require('mongoose');

// A schema tells MongoDB what a user document should look like.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'restaurant'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// The model gives us methods like User.create() and User.findOne().
module.exports = mongoose.model('User', userSchema);
