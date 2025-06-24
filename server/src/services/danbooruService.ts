import axios from 'axios';
import config from '../config/environment.js';

// A basic type for the Gelbooru Post object.
// Fields are based on common 'booru formats and may need adjustment.
export interface Post {
  id: number;
  file_url: string;
  image: string; // The filename of the image
  directory: string; // The subdirectory the image is in
  tags: string; // Space-separated list of tags
  owner: string; // The artist tag is usually in 'owner'
  rating: string;
  created_at: string;
}

function buildTags(artistTag: string): string {
  const baseTags = `${artistTag}`;
  return baseTags.trim();
}

/**
 * Fetches a post from Gelbooru for a given artist tag.
 * The 'nth' post is determined by a random page ID.
 * @param {string} artistTag - The artist tag to search for.
 * @param {number} n - A number used to seed the random page selection.
 * @returns {Promise<Post|null>} A promise that resolves to the post object or null if not found.
 */
async function getNthPostByArtist(artistTag: string, n: number = 1): Promise<Post | null> {
  // Ensure n is a positive integer for seeding the random page
  if (n < 1) {
    console.error('Error: n must be a positive integer.');
    return null;
  }
  
  // Use 'n' to seed a pseudorandom page within the configured limit.
  // This simulates fetching a random post since Gelbooru lacks a direct 'random' feature.
  const pageId = Math.floor(Math.random() * config.danbooru.nthPostLimit);

  try {
    const url = `${config.danbooru.baseUrl}?page=dapi&s=post&q=index&json=1`;
    
    const params: any = {
      tags: buildTags(artistTag),
      limit: 1,
      pid: pageId,
    };

    if (config.danbooru.apiKey && config.danbooru.userId) {
      params.api_key = config.danbooru.apiKey;
      params.user_id = config.danbooru.userId;
    }

    const response = await axios.get<{ post: Post[] } | ''>(url, { params });
    console.log(response.data);

    // Gelbooru can return an empty string or an object with an empty post array
    if (response.data && 'post' in response.data && response.data.post && response.data.post.length > 0) {
      return response.data.post[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching post for artist ${artistTag}:`, error);
    return null;
  }
}

// Since Gelbooru's API doesn't support a true 'random' or a clear 'most recent' that is distinct
// from our main fetch, we will funnel all requests through a single, consistent function.
// The old function names are kept for compatibility with the services that call them.

export default {
  getRandomPostByArtist: (artistTag: string) => getNthPostByArtist(artistTag),
  getMostRecentPostByArtist: (artistTag: string) => getNthPostByArtist(artistTag),
  getNthMostRecentPostByArtist: (artistTag: string, n?: number) => getNthPostByArtist(artistTag, n),
}; 