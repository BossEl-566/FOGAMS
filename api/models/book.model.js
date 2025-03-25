import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    availableSlots: [
      {
        date: {
          type: String, // Format: "YYYY-MM-DD"
          required: true,
        },
        timeSlots: [
          {
            startTime: { 
                type: String, 
                required: true 
            }, // Example: "10:00 AM"
            endTime: { 
                type: String, 
                required: true 
            }, // Example: "11:00 AM"
            bookedBy: [
              {
                userId: { 
                    type: String, 
                    required: true 
                }, // ID of the user who booked
                username: { 
                    type: String, 
                    required: true 
                }, // Optional: Name of the user
              },
            ], // Allows multiple users to book the same slot
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
