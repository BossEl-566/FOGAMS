import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  votes: { 
    type: Number, 
    default: 0 
},
  votedUsers: { 
    type: [String], 
    default: [] 
}, 
});

const PositionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
}, 
  candidates: [CandidateSchema], 
  votedUsers: { 
    type: [String], 
    default: [] 
}, 
  expiresAt: { 
    type: Date, 
    required: true 
}, 
  isExpired: { 
    type: Boolean, 
    default: false 
}, 
}, 
{ timestamps: true}
);

const Position = mongoose.model("Position", PositionSchema);

export default Position;
