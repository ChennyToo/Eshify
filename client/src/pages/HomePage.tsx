import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../services/gameService';
import GameSetupForm from '../components/HomePage/GameSetupForm';
import PageLayout from '../components/layout/PageLayout';

const HomePage = () => {
  const navigate = useNavigate();
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
      await gameService.startGame({
        selectedArtists: artistList,
        numberOfRounds: rounds,
      });
      navigate('/game', { state: { artists: artistList, rounds } });
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