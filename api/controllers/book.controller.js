import Booking from "../models/book.model.js";






export const createBookTime = async (req, res, next) => {
    if (!req.user.isPastor) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const { date, timeSlots } = req.body;

    // Check if there is already a booking entry for the given date
    let existingBooking = await Booking.findOne({ "availableSlots.date": date });

    if (existingBooking) {
      // Update the existing entry by adding new time slots
      await Booking.updateOne(
        { "availableSlots.date": date },
        { $push: { "availableSlots.$.timeSlots": { $each: timeSlots } } }
      );
      return res.status(200).json({ message: "Time slots updated successfully" });
    } else {
      // Create a new booking entry
      const newBooking = new Booking({
        availableSlots: [{ date, timeSlots }],
      });

      await newBooking.save();
      return res.status(201).json({ message: "Available time slots created successfully" });
    }
    } catch (error) {
        next(error);
        
    }
};