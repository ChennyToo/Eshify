import React from 'react';
import styles from './GameSetupForm.module.css';

interface GameSetupFormProps {
  artists: string;
  rounds: number;
  isLoading: boolean;
  error: string | null;
  onArtistsChange: (value: string) => void;
  onRoundsChange: (value: number) => void;
  onStartGame: (e: React.FormEvent) => void;
}

const GameSetupForm: React.FC<GameSetupFormProps> = ({
  artists,
  rounds,
  isLoading,
  error,
  onArtistsChange,
  onRoundsChange,
  onStartGame,
}) => {
  return (
    <form onSubmit={onStartGame} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="artists">Artist Tags (separated by commas, spaces, or new lines):</label>
        <textarea
          id="artists"
          value={artists}
          onChange={(e) => onArtistsChange(e.target.value)}
          placeholder="e.g., takeuchi_takashi, k-eke"
          className={styles.textarea}
          rows={5}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="rounds">Number of Rounds:</label>
        <input
          id="rounds"
          type="number"
          value={rounds}
          onChange={(e) => onRoundsChange(parseInt(e.target.value, 10))}
          min="1"
          max="20"
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Starting...' : 'Start Game'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default GameSetupForm; 