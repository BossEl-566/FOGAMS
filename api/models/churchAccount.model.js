import mongoose from 'mongoose';

const churchAccountSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  nameOfThoseWhoPaid: [
    {
      name: String,
      amount: Number
    }
  ],
  thanksgiving: {
    type: Number,
    default: 0,
  },
  welfare: {
    type: Number,
    default: 0,
  },
  communityImpact: {
    type: Number,
    default: 0,
  },
  sundayOfferingFirstService: {
    type: Number,
    default: 0,
  },
  sundayOfferingSecondService: {
    type: Number,
    default: 0,
  },
  sundayOfferingThirdService: {
    type: Number,
    default: 0,
  },
  sundayOfferingFirstServiceProject: {
    type: Number,
    default: 0,
  },
  sundayOfferingSecondServiceProject: {
    type: Number,
    default: 0,
  },
  sundayOfferingThirdServiceProject: {
    type: Number,
    default: 0,
  },
  childrenServiceOffering: {
    type: Number,
    default: 0,
  },
  sundaySchool: {
    type: Number,
    default: 0,
  },
  midWeekOffering: {
    type: Number,
    default: 0,
  },
  fridayPrayerOffering: {
    type: Number,
    default: 0,
  },
  ifAnySpecialOfferingSpecify: [
    {
      event: String,
      amount: Number
    }
  ],
}, { timestamps: true });

const ChurchAccount = mongoose.model('ChurchAccount', churchAccountSchema);

export default ChurchAccount;
