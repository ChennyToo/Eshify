import { Router } from 'express';
import gameController from '../controllers/gameController.js';

const router = Router();

router.post('/', gameController.createGame);

export default router; 