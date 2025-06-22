import React, { useState } from 'react';
import { gameService } from '../services/gameService';

const HomePage = () => {
  const [artists, setArtists] = useState('takeuchi_takashi, k-eke');
  const [rounds, setRounds] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const artistList = artists.split(',').map(artist => artist.trim()).filter(artist => artist);

    if (artistList.length === 0) {
      setError('Please enter at least one artist tag.');
      setIsLoading(false);
      return;
    }

    try {
      const gameData = await gameService.startGame({
        selectedArtists: artistList,
        numberOfRounds: rounds,
      });
      console.log('--- Game Data Received ---');
      console.log(gameData);
      // We will navigate to the game screen with this data later
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Game</h1>
      <form onSubmit={handleStartGame}>
        <div>
          <label htmlFor="artists">Artist Tags (comma-separated):</label>
          <input
            id="artists"
            type="text"
            value={artists}
            onChange={(e) => setArtists(e.target.value)}
            placeholder="e.g., takeuchi_takashi, k-eke"
            style={{ width: '300px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="rounds">Number of Rounds:</label>
          <input
            id="rounds"
            type="number"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value, 10))}
            min="1"
            max="20"
            style={{ width: '50px', marginLeft: '10px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '20px' }} disabled={isLoading}>
          {isLoading ? 'Starting...' : 'Start Game'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default HomePage; 