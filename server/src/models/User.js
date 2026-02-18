import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  age: Number,
  heightCm: Number,
  weightKg: Number,
  gender: { type: String, enum: ['male','female','other'], default: 'other' },
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // aka "following"
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
