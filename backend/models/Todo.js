import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
  email: String,
});

export default mongoose.model("Todo", todoSchema);