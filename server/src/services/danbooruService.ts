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
  tag_string_artist: string;
}

/**
 * Creates the base parameters for any Danbooru API request, including authentication.
 * @returns {object} An object containing the base parameters for an API call.
 */
function getApiBaseParams(): { [key: string]: string | undefined } {
  const params: { [key: string]: string | undefined } = {
    'search[created_at]': '>=2024-01-01',
  };

  if (config.danbooru.apiUser && config.danbooru.apiKey) {
    params.login = config.danbooru.apiUser;
    params.api_key = config.danbooru.apiKey;
  }
  return params;
}

function buildTags(artistTag: string): string {
  const baseTags = `${artistTag}`;
  const hardcodedNegativeTags = config.danbooru.negativeTags;
  return `${baseTags} ${hardcodedNegativeTags}`.trim();
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
        tags: buildTags(artistTag),
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
        tags: buildTags(artistTag),
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

/**
 * Fetches the nth most recent post from Danbooru for a given artist tag.
 * @param {string} artistTag - The artist tag to search for.
 * @param {number} n - The 'nth' post to retrieve (e.g., 1 for the most recent, 2 for the second most recent).
 * @returns {Promise<Post|null>} A promise that resolves to the nth most recent post object or null if not found.
 */
async function getNthMostRecentPostByArtist(artistTag: string, n: number = 1): Promise<Post | null> {
  // Ensure n is a positive integer
  if (n < 1) {
    console.error('Error: n must be a positive integer.');
    return null;
  }

  try {
    const url = `${config.danbooru.baseUrl}/posts.json`;
    const response = await axios.get<Post[]>(url, {
      params: {
        ...getApiBaseParams(),
        tags: buildTags(artistTag),
        limit: 1,
        page: n, // The 'page' parameter gets us the nth result when limit is 1
      },
    });

    if (response.data && response.data.length > 0) {
        console.log("Response Data:", response.data);
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${n}th post for artist ${artistTag}:`, error);
    return null;
  }
}

export default {
  getRandomPostByArtist,
  getMostRecentPostByArtist,
  getNthMostRecentPostByArtist,
}; 