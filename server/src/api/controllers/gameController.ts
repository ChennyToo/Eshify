import { Request, Response } from 'express';
import gameService from '../../services/gameService.js';
import { GameRound } from '../../services/gameService.js';

interface CreateGameRequestBody {
  selectedArtists: string[];
  numberOfRounds: number;
}

/**
 * Handles the creation of a new game session.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function createGame(req: Request<{}, {}, CreateGameRequestBody>, res: Response<GameRound[] | { message: string }>) {
  try {
    const { selectedArtists, numberOfRounds } = req.body;

    if (!selectedArtists || !numberOfRounds) {
      return res.status(400).json({ message: 'Missing selectedArtists or numberOfRounds in request body.' });
    }

    const gameSession = await gameService.generateNewGame(selectedArtists, numberOfRounds);
    res.status(200).json(gameSession);
  } catch (error) {
    console.error('Error creating game session:', error);
    res.status(500).json({ message: 'Failed to create game session.' });
  }
}

export default {
  createGame,
}; 