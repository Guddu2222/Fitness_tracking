import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.js';
import workoutRoutes from './routes/workouts.js';
import mealRoutes from './routes/meals.js';
import goalRoutes from './routes/goals.js';
import statRoutes from './routes/stats.js';
import friendRoutes from './routes/friends.js';
import nutritionRoutes from './routes/nutrition.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, message: 'Fitness Tracker API' }));

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/nutrition', nutritionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, message: 'Server Error' });
});

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`API listening on :${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please close the other process or use a different port.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  });
}).catch(err => {
  console.error('DB connection failed:', err.message);
  process.exit(1);
});
