import danbooruService, { Post } from './danbooruService.js';

/**
 * A clean, simplified representation of a post, containing only the data
 * our application needs.
 */
export interface CleanedPost {
  id: number;
  imageUrl: string;
  artistTag: string;
}

/**
 * Parses a raw Post object from the Danbooru API into a CleanedPost object.
 * @param {Post} rawPost The raw post object from the service.
 * @returns {CleanedPost} A clean post object with only the necessary fields.
 */
function parsePost(rawPost: Post): CleanedPost {
  return {
    id: rawPost.id,
    imageUrl: rawPost.large_file_url || rawPost.file_url,
    artistTag: rawPost.tag_string_artist,
  };
}

/**
 * Fetches a random post for an artist and returns it in a clean format.
 * @param {string} artistTag The artist tag to search for.
 * @returns {Promise<CleanedPost|null>} A promise that resolves to a single clean post object or null.
 */
async function getRandomCleanedPostByArtist(artistTag: string): Promise<CleanedPost | null> {
  const rawPost = await danbooruService.getRandomPostByArtist(artistTag);
  if (!rawPost) {
    return null;
  }
  return parsePost(rawPost);
}

/**
 * Fetches the nth most recent post for an artist and returns it in a clean format.
 * @param {string} artistTag The artist tag to search for.
 * @param {number} n The 'nth' post to retrieve.
 * @returns {Promise<CleanedPost|null>} A promise that resolves to a single clean post object or null.
 */
async function getNthCleanedPostByArtist(artistTag: string, n: number): Promise<CleanedPost | null> {
  const rawPost = await danbooruService.getNthMostRecentPostByArtist(artistTag, n);
  if (!rawPost) {
    return null;
  }
  return parsePost(rawPost);
}

export default {
  getRandomCleanedPostByArtist,
  getNthCleanedPostByArtist,
}; 