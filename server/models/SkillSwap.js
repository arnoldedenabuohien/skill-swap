import mongoose from 'mongoose';

const skillSwapSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  canHelpWith: {
    type: String,
    required: true
  },
  needsHelpWith: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  interestedUsers: [{
    name: String,
    email: String,
    preferredTime: String,
    preferredLocation: String,
    contactDate: {
      type: Date,
      default: Date.now
    }
  }]
});

const SkillSwap = mongoose.model('SkillSwap', skillSwapSchema);

export default SkillSwap; 