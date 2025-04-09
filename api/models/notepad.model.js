import mongoose from "mongoose";

const notepadSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notepad = mongoose.model("Notepad", notepadSchema);
export default Notepad;