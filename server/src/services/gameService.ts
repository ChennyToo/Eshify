import danbooruService, { Post } from './danbooruService.js';

interface RoundDefinition {
  roundNumber: number;
  choices: string[];
  correctAnswer: string;
}

export interface GameRound extends RoundDefinition {
  post: Post;
}

/**
 * Generates a new game session by fetching random posts for a selection of artists.
 * @param {string[]} selectedArtists - An array of artist tags selected by the user.
 * @param {number} numberOfRounds - The number of rounds for the game.
 * @returns {Promise<GameRound[]>} A promise that resolves to an array of round objects.
 */
async function generateNewGame(selectedArtists: string[], numberOfRounds: number): Promise<GameRound[]> {
  // 1. Create round definitions
  const roundDefinitions: RoundDefinition[] = [];
  for (let i = 0; i < numberOfRounds; i++) {
    const correctAnswer = selectedArtists[Math.floor(Math.random() * selectedArtists.length)];
    roundDefinitions.push({
      roundNumber: i + 1,
      choices: selectedArtists,
      correctAnswer,
    });
  }

  // 2. Create an array of fetch promises
  const fetchPromises = roundDefinitions.map(round =>
    danbooruService.getRandomPostByArtist(round.correctAnswer)
  );

  // 3. Execute all promises concurrently
  const posts = await Promise.all(fetchPromises);

  // 4. Combine posts with round definitions and filter out failures
  const gameRounds = roundDefinitions
    .map((round, index) => {
      const post = posts[index];
      return post ? { ...round, post } : null;
    })
    .filter((round): round is GameRound => round !== null);

  return gameRounds;
}

export default {
  generateNewGame,
}; 