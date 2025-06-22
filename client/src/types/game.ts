/**
 * The clean, simplified post object that the frontend receives from the backend.
 */
export interface CleanedPost {
  id: number;
  imageUrl: string;
  rating: string;
  artistTag: string;
}

/**
 * Represents a single round of the game, including the post and choices.
 */
export interface GameRound {
  roundNumber: number;
  choices: string[];
  correctAnswer: string;
  post: CleanedPost;
} 