import mongoose from "mongoose";

const dailyBibleMessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'https://img.freepik.com/premium-photo/hand-watering-growing-plant-soil-with-blurred-vegetation-background_104677-431.jpg?w=826'
    },
    category: {
        type: String,
        default: 'uncategorized'
    }, 
    slug: {
        type: String,
        required: true,
        unique: true,
    } 

}, { timestamps: true });

const DailyBibleMessage = mongoose.model('DailyBibleMessage', dailyBibleMessageSchema);

export default DailyBibleMessage;