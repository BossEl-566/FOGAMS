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

export const getBookTime = async (req, res, next) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};


export const bookAppointment = async (req, res, next) => {
  if (!req.user.isMember) {
    return next(errorHandler(403, 'You must be a member to book an appointment'));
  }
  try {
    const { bookingId, slotId } = req.params;
    const { userId, username } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Find the specific time slot
    const timeSlot = booking.availableSlots
      .flatMap(dateSlot => dateSlot.timeSlots)
      .find(slot => slot._id.toString() === slotId);

    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    // Check if already booked
    if (timeSlot.bookedBy.some(booking => booking.userId === userId)) {
      return res.status(400).json({ message: 'You have already booked this slot' });
    }

    // Add the booking
    timeSlot.bookedBy.push({ userId, username });

    // Save the updated booking
    await booking.save();

    res.status(200).json(booking);
    
  } catch (error) {
    next(error);
    
  }
};