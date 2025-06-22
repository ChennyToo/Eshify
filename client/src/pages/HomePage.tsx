import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../services/gameService';
import GameSetupForm from '../components/HomePage/GameSetupForm';
import PageLayout from '../components/layout/PageLayout';
import defaultArtists from '../assets/artistList2(easy).json';

const HomePage = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState(defaultArtists.join(', '));
  const [rounds, setRounds] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const artistList = artists.split(/[\s,]+/).map(artist => artist.trim()).filter(artist => artist);

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

      console.log('--- Game Data Fetched on Home Page ---');
      gameData.forEach(round => {
        console.log(`Round ${round.roundNumber}:`);
        console.log(`  Artist: ${round.correctAnswer}`);
        console.log(`  Image URL: ${round.post.imageUrl}`);
      });
      console.log('------------------------------------');

      navigate('/game', { state: { gameRounds: gameData, artists: artistList, rounds } });
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
    <PageLayout>
      <GameSetupForm
        artists={artists}
        rounds={rounds}
        isLoading={isLoading}
        error={error}
        onArtistsChange={setArtists}
        onRoundsChange={setRounds}
        onStartGame={handleStartGame}
      />
    </PageLayout>
  );
};

export default HomePage; 