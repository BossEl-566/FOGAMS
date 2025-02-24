import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    member: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;