import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import IncorrectAnswersGrid from '../components/ResultsPage/IncorrectAnswersGrid';
import { IncorrectGuess } from '../types/game';
import styles from './ResultsPage.module.css';

const ResultsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, rounds, incorrectGuesses } = location.state as { score: number, rounds: number, incorrectGuesses: IncorrectGuess[] };

    return (
        <PageLayout>
            <div className={styles.resultsContainer}>
                <h1>Game Over!</h1>
                <p className={styles.score}>Your final score is: {score} / {rounds}</p>
                <button className={styles.button} onClick={() => navigate('/')}>
                    Play Again
                </button>
            </div>
            <IncorrectAnswersGrid incorrectGuesses={incorrectGuesses} />
        </PageLayout>
    );
};

export default ResultsPage; 