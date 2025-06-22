import axios from 'axios';
import { GameRound } from '../types/game';

const API_BASE_URL = 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface StartGamePayload {
  selectedArtists: string[];
  numberOfRounds: number;
}

/**
 * Calls the backend API to create a new game session.
 * @param payload - The selected artists and number of rounds.
 * @returns A promise that resolves to an array of GameRound objects.
 */
const startGame = async (payload: StartGamePayload): Promise<GameRound[]> => {
  try {
    const response = await apiClient.post<GameRound[]>('/game', payload);
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred.';
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API Error Response:', error.response);
        errorMessage = `The server responded with an error: ${error.response.status}.`;
      } else if (error.request) {
        // The request was made but no response was received (e.g., server is down)
        console.error('API Network Error:', error.request);
        errorMessage = 'Could not connect to the server. Please check if it is running.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Axios Setup Error:', error.message);
        errorMessage = `Error setting up request: ${error.message}`;
      }
    }
    // Re-throw a new error with a user-friendly message
    throw new Error(errorMessage);
  }
};

export const gameService = {
  startGame,
}; 