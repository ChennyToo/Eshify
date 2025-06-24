import React from 'react';
import { IncorrectGuess } from '../../types/game';
import styles from './IncorrectAnswersGrid.module.css';

interface IncorrectAnswersGridProps {
    incorrectGuesses: IncorrectGuess[];
}

const IncorrectAnswersGrid: React.FC<IncorrectAnswersGridProps> = ({ incorrectGuesses }) => {
    if (!incorrectGuesses || incorrectGuesses.length === 0) {
        return null;
    }

    return (
        <div className={styles.incorrectAnswersContainer}>
            <h2>Review Your Answers</h2>
            <div className={styles.incorrectGrid}>
                {incorrectGuesses.map((item, index) => (
                    <div key={index} className={styles.incorrectItem}>
                        <a href={`https://danbooru.donmai.us/posts/${item.post.id}`} target="_blank" rel="noopener noreferrer">
                            <img src={item.post.imageUrl} alt="Incorrectly guessed art" className={styles.incorrectImage} />
                        </a>
                        <div className={styles.incorrectDetails}>
                            <p>Your guess: <span>{item.userGuess}</span></p>
                            <p>
                                Correct answer:{' '}
                                <a
                                    href={`https://danbooru.donmai.us/posts?tags=${encodeURIComponent(item.correctAnswer)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                >
                                    {item.correctAnswer}
                                </a>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncorrectAnswersGrid; 