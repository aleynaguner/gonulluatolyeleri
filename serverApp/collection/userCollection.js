const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  email: String,
  password: String,
});

module.exports = mongoose.model("user", UserSchema, "user");
