import Position from "../models/poll.model.js";
import { errorHandler } from "../utils/error.js";

export const createPosition = async (req, res) => {
  
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "You are not allowed to perform this task" });
  }

  try {
    const { title, candidates, expiresAt } = req.body;

    
    const candidateObjects = candidates.map((name) => ({ name }));

    
    const newPosition = new Position({
      title,
      candidates: candidateObjects, 
      expiresAt,
    });

    
    await newPosition.save();

    res.status(201).json({ message: "Position created successfully!", newPosition });
  } catch (error) {
    console.error("Error creating position:", error);
    res.status(500).json({ message: "Error creating position", error: error.message });
  }
};


export const getPositions = async (req, res) => {
  try {
    const positions = await Position.find().sort({ createdAt: -1 });
    res.status(200).json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ message: "Error fetching positions", error: error.message });
  }
};


export const castVote = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, 'You must be a member to vote'));
    }

    const { positionId } = req.params; // Extract positionId from route parameters
    const { candidateId } = req.body;  // Extract candidateId from request body
    const userId = req.user.id;        // Assuming user authentication

    try {
        // Validate the position
        const position = await Position.findById(positionId);
        if (!position) {
            return res.status(404).json({ message: "Position not found!" });
        }

        // Check if voting is expired
        if (new Date() > position.expiresAt) {
            return res.status(400).json({ message: "Voting for this position has ended!" });
        }

        // Check if the user has already voted for this position
        if (position.votedUsers.includes(userId)) {
            return res.status(400).json({ message: "You have already voted for this position!" });
        }

        // Find the candidate within the position
        const candidate = position.candidates.id(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found!" });
        }

        // Check if the user has already voted for this candidate
        if (candidate.votedUsers.includes(userId)) {
            return res.status(400).json({ message: "You have already voted for this candidate!" });
        }

        // Register the vote
        candidate.votes += 1;
        candidate.votedUsers.push(userId); // Add the user to the candidate's votedUsers list
        position.votedUsers.push(userId);  // Add the user to the position's votedUsers list

        // Save the updated position
        await position.save();

        // Respond with success
        res.status(200).json({
            message: "Vote cast successfully!",
            candidate,
            position,
        });
    } catch (error) {
        next(error);
    }
};

export const getPollResults = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        // Fetch all positions from the database
        const positions = await Position.find();

        // Process the data for visualization
        const processedResults = positions.map((position) => {
            // Calculate total votes for the position
            const totalVotes = position.votedUsers.length;

            return {
                title: position.title,
                expiresAt: position.expiresAt,
                isExpired: new Date() > position.expiresAt, // Check if voting has ended
                candidates: position.candidates.map((candidate) => {
                    const percentage = totalVotes > 0
                        ? ((candidate.votes / totalVotes) * 100).toFixed(2)
                        : "0.00"; // Handle cases where there are no votes yet

                    return {
                        name: candidate.name,
                        votes: candidate.votes,
                        percentage: `${percentage}%`,
                    };
                }),
            };
        });

        // Respond with the processed results
        res.status(200).json(processedResults);
    } catch (error) {
        next(error);
    }
};
