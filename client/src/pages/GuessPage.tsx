import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GameRound, IncorrectGuess } from '../types/game';
import PageLayout from '../components/layout/PageLayout';
import './GuessPage.css';

const GuessPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { gameRounds, artists, rounds } = location.state as { gameRounds: GameRound[], artists: string[], rounds: number };

    const [currentRound, setCurrentRound] = useState(0);
    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState<IncorrectGuess[]>([]);

    const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const oldValue = guess;
        const newValue = e.target.value;

        // If the current guess is already a full artist name,
        // only allow changes that shorten the input (like backspace).
        if (artists.includes(oldValue) && newValue.length > oldValue.length) {
            return; // Prevent adding more characters
        }

        setGuess(newValue);

        if (newValue.length >= 2) {
            const filteredSuggestions = artists.filter(artist =>
                artist.toLowerCase().includes(newValue.toLowerCase())
            );

            // Only autofill if we are narrowing down to one result and typing forward
            if (filteredSuggestions.length === 1 && newValue.length > oldValue.length) {
                setGuess(filteredSuggestions[0]);
                setSuggestions([]);
            } else {
                setSuggestions(filteredSuggestions);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setGuess(suggestion);
        setSuggestions([]);
    };

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
        let updatedIncorrectGuesses = incorrectGuesses;

        if (!isCorrect) {
            const newIncorrectGuess = {
                userGuess: guess.trim(),
                correctAnswer: gameRounds[currentRound].correctAnswer,
                post: gameRounds[currentRound].post,
            };
            updatedIncorrectGuesses = [...incorrectGuesses, newIncorrectGuess];
            setIncorrectGuesses(updatedIncorrectGuesses);
        }

        console.log(`Round: ${currentRound + 1}/${rounds}`);
        console.log(`User's Guess: "${userGuess}"`);
        console.log(`Correct Answer: "${correctAnswer}"`);
        console.log(`Was guess correct? ${isCorrect}`);
        console.log(`Score (Before): ${score}`);

        if (currentRound < rounds - 1) {
            if (isCorrect) {
                setScore(score + 1);
                console.log(`Score (After): ${score + 1}`);
            } else {
                console.log(`Score (After): ${score}`);
            }
            console.log('Advancing to the next round.');
            setCurrentRound(currentRound + 1);
            setGuess('');
        } else {
            const finalScore = isCorrect ? score + 1 : score;
            console.log(`Score (After): ${finalScore}`);
            console.log('Game over.');
            navigate('/results', { state: { score: finalScore, rounds, incorrectGuesses: updatedIncorrectGuesses } });
        }
        console.log('----------------------');
        setSuggestions([]);
    };

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
                <form onSubmit={handleGuessSubmit} className="guess-form">
                    <div className="autocomplete-container">
                        <input
                            type="text"
                            value={guess}
                            onChange={handleGuessChange}
                            placeholder="Enter artist name"
                            autoComplete="off"
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit">Guess</button>
                </form>
                <img src={currentRoundData.post.imageUrl} alt="Guess the artist" style={{ maxWidth: '500px' }} />
            </div>
        </PageLayout>
    );
};

export default GuessPage; 