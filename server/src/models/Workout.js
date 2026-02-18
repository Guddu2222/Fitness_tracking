import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['cardio','strength','yoga','hiit','other'], default: 'other' },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    durationMin: Number,
    calories: Number
  }]
}, { timestamps: true });

export default mongoose.model('Workout', workoutSchema);
