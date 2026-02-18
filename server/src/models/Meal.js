import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  items: [{
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  }]
}, { timestamps: true });

export default mongoose.model('Meal', mealSchema);
