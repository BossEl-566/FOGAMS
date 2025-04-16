import mongoose from 'mongoose';

const broadcastMessageSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    scheduledTime: {
      type: String, // You can change this to Date if you prefer
      default: '',
    },
  },
  { timestamps: true }
);

const BroadcastMessage = mongoose.model('BroadcastMessage', broadcastMessageSchema);

export default BroadcastMessage;
