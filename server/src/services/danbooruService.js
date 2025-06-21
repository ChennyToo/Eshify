import axios from 'axios';
import config from '../config/environment.js';

/**
 * Creates the base parameters for any Danbooru API request, including authentication.
 * @returns {object} An object containing the base parameters for an API call.
 */
function getApiBaseParams() {
  const params = {};
  if (config.danbooru.apiUser && config.danbooru.apiKey) {
    params.login = config.danbooru.apiUser;
    params.api_key = config.danbooru.apiKey;
  }
  return params;
}

/**
 * Fetches a random post from Danbooru for a given artist tag.
 * @param {string} artistTag - The artist tag to search for.
 * @returns {Promise<object|null>} A promise that resolves to the post object or null if no post is found or an error occurs.
 */
async function getRandomPostByArtist(artistTag) {
  try {
    const url = `${config.danbooru.baseUrl}/posts.json`;
    const response = await axios.get(url, {
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
 * @returns {Promise<object|null>} A promise that resolves to the most recent post object or null if no post is found or an error occurs.
 */
async function getMostRecentPostByArtist(artistTag) {
  try {
    const url = `${config.danbooru.baseUrl}/posts.json`;
    const response = await axios.get(url, {
      params: {
        ...getApiBaseParams(),
        tags: `${artistTag}`,
        limit: 1,
        // The API docs don't specify order, but ordering by descending ID is a standard REST convention for "most recent".
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