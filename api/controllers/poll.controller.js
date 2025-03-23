import Position from "../models/poll.model.js";

export const createPosition = async (req, res) => {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "You are not allowed to perform this task" });
  }

  try {
    const { title, candidates, expiresAt } = req.body;

    // Transform candidates array of strings into an array of objects
    const candidateObjects = candidates.map((name) => ({ name }));

    // Create the new position
    const newPosition = new Position({
      title,
      candidates: candidateObjects, // Pass the array of objects
      expiresAt,
    });

    // Save the position to the database
    await newPosition.save();

    res.status(201).json({ message: "Position created successfully!", newPosition });
  } catch (error) {
    console.error("Error creating position:", error);
    res.status(500).json({ message: "Error creating position", error: error.message });
  }
};