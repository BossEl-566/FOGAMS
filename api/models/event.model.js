import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true, // Event date and time
    },
    location: {
      type: String,
      required: true, // Event location
    },
    imageUrl: {
      type: String,
      default: null, // Optional: Link to an image/banner for the event
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
