import gameService from '../../services/gameService.js';

/**
 * Handles the creation of a new game session.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
async function createGame(req, res) {
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