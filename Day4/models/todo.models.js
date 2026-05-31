const mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  status: { type: Boolean, default: false },
  progression: {
    type: String,
    enum: ["Paused", "InProgress", "AboutToComplete"],
    default: "InProgress",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

let TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;
