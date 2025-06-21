import axios from 'axios';
import config from '../config/environment.js';

// A basic type for the Danbooru Post object.
// Add more fields here as needed.
export interface Post {
  id: number;
  file_url: string;
  large_file_url: string;
  preview_file_url: string;
  rating: string;
  created_at: string;
}

/**
 * Creates the base parameters for any Danbooru API request, including authentication.
 * @returns {object} An object containing the base parameters for an API call.
 */
function getApiBaseParams(): { login?: string; api_key?: string } {
  const params: { login?: string; api_key?: string } = {};
  if (config.danbooru.apiUser && config.danbooru.apiKey) {
    params.login = config.danbooru.apiUser;
    params.api_key = config.danbooru.apiKey;
  }
  return params;
}

/**
 * Fetches a random post from Danbooru for a given artist tag.
 * @param {string} artistTag - The artist tag to search for.
 * @returns {Promise<Post|null>} A promise that resolves to the post object or null if no post is found or an error occurs.
 */
async function getRandomPostByArtist(artistTag: string): Promise<Post | null> {
  try {
    const url = `${config.danbooru.baseUrl}/posts.json`;
    const response = await axios.get<Post[]>(url, {
      params: {
        ...getApiBaseParams(),
        tags: `${artistTag} rating:safe`,
        limit: 1,
        random: true,
      },
    });

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching random post for artist ${artistTag}:`, error);
    return null;
  }
}

/**
 * Fetches the most recent post from Danbooru for a given artist tag.
 * @param {string} artistTag - The artist tag to search for.
 * @returns {Promise<Post|null>} A promise that resolves to the most recent post object or null if no post is found or an error occurs.
 */
async function getMostRecentPostByArtist(artistTag: string): Promise<Post | null> {
  try {
    const url = `${config.danbooru.baseUrl}/posts.json`;
    const response = await axios.get<Post[]>(url, {
      params: {
        ...getApiBaseParams(),
        tags: `${artistTag} rating:safe`,
        limit: 1,
        'search[order]': 'id_desc',
      },
    });

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching most recent post for artist ${artistTag}:`, error);
    return null;
  }
}

export default {
  getRandomPostByArtist,
  getMostRecentPostByArtist,
}; 