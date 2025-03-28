import mongoose from "mongoose";

const anonymousSchema = new mongoose.Schema(
    {
        message: {
        type: String,
        required: true,
        },
    },
    { timestamps: true }
    );

const Anonymous = mongoose.model("Anonymous", anonymousSchema);

export default Anonymous;