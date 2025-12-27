// models/NewMember.js
import mongoose from "mongoose";

const newMemberSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    interestedInMembership: {
      type: Boolean,
      default: false,
    },
    residence: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
      enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    },
    occupation: {
      type: String,
      required: true,
    },
    howDidYouHearAboutUs: {
      type: String,
      required: true,
    },
    otherSource: {
      type: String,
      default: ''
    },
  }, 
  { timestamps: true }
);

const NewMember = mongoose.model('NewMember', newMemberSchema);

export default NewMember;