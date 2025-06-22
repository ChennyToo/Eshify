import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GameRound } from '../types/game';
import { gameService } from '../services/gameService';
import PageLayout from '../components/layout/PageLayout';
// We will get the real game data from routing state later
// import { useLocation } from 'react-router-dom';

const placeholderRound = {
  roundNumber: 1,
  choices: ['takeuchi_takashi', 'k-eke'],
  correctAnswer: 'takeuchi_takashi',
  post: {
    id: 12345,
    imageUrl: 'https://via.placeholder.com/800x600.png?text=Game+Image+Here',
    rating: 's',
    artistTag: 'takeuchi_takashi',
  }
};

const GuessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artists, rounds } = location.state as { artists: string[], rounds: number };

  const [gameRounds, setGameRounds] = useState<GameRound[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const startGame = async () => {
      try {
        const newGameRounds = await gameService.startGame({
          selectedArtists: artists,
          numberOfRounds: rounds
        });
        setGameRounds(newGameRounds);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    startGame();
  }, [artists, rounds]);

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('--- Guess Submitted ---');

    if (!gameRounds) {
        console.error('`handleGuessSubmit` called but `gameRounds` is not set.');
        return;
    }

    const userGuess = guess.trim().toLowerCase();
    const correctAnswer = gameRounds[currentRound].correctAnswer.toLowerCase();
    const isCorrect = userGuess === correctAnswer;

    console.log(`Round: ${currentRound + 1}/${rounds}`);
    console.log(`User's Guess: "${userGuess}"`);
    console.log(`Correct Answer: "${correctAnswer}"`);
    console.log(`Was guess correct? ${isCorrect}`);
    console.log(`Score (Before): ${score}`);

    if (isCorrect) {
        setScore(score + 1);
        console.log(`Score (After): ${score + 1}`);
    } else {
        console.log(`Score (After): ${score}`);
    }

    if (currentRound < rounds - 1) {
        console.log('Advancing to the next round.');
        setCurrentRound(currentRound + 1);
        setGuess('');
    } else {
        console.log('Game over.');
        setGameOver(true);
    }
    console.log('----------------------');
  };

  if (loading) {
    return <PageLayout><div>Loading game...</div></PageLayout>;
  }

  if (error) {
    return <PageLayout><div>Error: {error}</div></PageLayout>;
  }

  if (gameOver) {
    return (
      <PageLayout>
        <div>
          <h1>Game Over</h1>
          <p>Your final score is: {score} / {rounds}</p>
          <button onClick={() => navigate('/')}>Play Again</button>
        </div>
      </PageLayout>
    );
  }

  if (!gameRounds || gameRounds.length === 0) {
    return <PageLayout><div>Game could not be started or no rounds were generated.</div></PageLayout>;
  }

  const currentRoundData = gameRounds[currentRound];

  return (
    <PageLayout>
      <div>
        <h1>Guess the Artist</h1>
        <p>Round: {currentRound + 1} / {rounds}</p>
        <p>Score: {score}</p>
        <img src={currentRoundData.post.imageUrl} alt="Guess the artist" style={{ maxWidth: '500px' }} />
        <form onSubmit={handleGuessSubmit}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter artist name"
          />
          <button type="submit">Guess</button>
        </form>
      </div>
    </PageLayout>
  );
};

export default GuessPage; 