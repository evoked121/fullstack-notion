import mongoose from "mongoose";

const { Schema } = mongoose;

const blockSchema = new Schema({
  type: String,
  content: String,
  style: String,
  src: String,
  width: String,
  height: String,
});

export default mongoose.model("Block", blockSchema);
