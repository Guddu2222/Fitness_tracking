import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  target: { type: String, enum: ['weight_loss','muscle_gain','endurance','custom'], default: 'custom' },
  details: String,
  targetWeightKg: Number,
  dailyCalories: Number,
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

export default mongoose.model('Goal', goalSchema);
