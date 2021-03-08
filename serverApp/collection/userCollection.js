const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  email: String,
  hashedPassword: String,
  token: String,
  ipAddress: String,
});

module.exports = mongoose.model("user", UserSchema, "user");
