import mongoose from "mongoose";

const BaptismSchema = new mongoose.Schema(
  {
    userID: {
        type: String,
        required: true,
        unique: true, 
    },
    username: {
      type: String,
      required: true,
    },
    isBaptized: {
      type: Boolean,
      default: false,
    },
    dateOfBaptism: {
      type: Date,
    },
    age: {
      type: Number,
      required: true,
    },
},
  { timestamps: true } 
);

const Baptism = mongoose.model("Baptism", BaptismSchema);

export default Baptism;
