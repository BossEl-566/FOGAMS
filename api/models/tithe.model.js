import mongoose from "mongoose";

const TitheSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      enum: ["weekly", "monthly"],
      required: true,
    },
    weekOrMonth: {
      type: String,
    },
    paymentForMonth: {
      type: String,
      enum: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      required: true,
    },
    mode: {
      type: String,
      enum: ["physical cash", "mobile money"],
      required: true,
    },
    transactionID: {
      type: String, 
      default: null,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } 
);

const Tithe = mongoose.model("Tithe", TitheSchema);

export default Tithe;
