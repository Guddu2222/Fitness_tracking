import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { searchFood } from '../controllers/nutritionController.js';
const r = Router();
r.use(requireAuth);
r.get('/search', searchFood);
export default r;
