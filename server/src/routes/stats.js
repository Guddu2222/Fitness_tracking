import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { dailySummary } from '../controllers/statsController.js';
const r = Router();
r.use(requireAuth);
r.get('/daily', dailySummary);
export default r;
