import mongoose from "mongoose";

const anonymousSchema = new mongoose.Schema(
    {
        message: {
        type: String,
        required: true,
        },
        username: {
        type: String,
        required: true,
        },
        isShowUsername: {
        type: Boolean,
        default: false,
        },
    },
    { timestamps: true }
    );

const Anonymous = mongoose.model("Anonymous", anonymousSchema);

export default Anonymous;