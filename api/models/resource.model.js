import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'uncategorized'
    },
    downloads: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
