import express from 'express';
import cors from 'cors';
import gameRoutes from './api/routes/gameRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/game', gameRoutes);

export default app; 