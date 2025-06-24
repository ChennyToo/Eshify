import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  danbooru: {
    // Note: Despite the name, this is now for Gelbooru
    baseUrl: process.env.GELBOORU_BASE_URL || 'https://gelbooru.com/index.php',
    apiKey: process.env.GELBOORU_API_KEY,
    userId: process.env.GELBOORU_USER_ID,
    nthPostLimit: process.env.DANBOORU_NTH_POST_LIMIT ? parseInt(process.env.DANBOORU_NTH_POST_LIMIT, 10) : 100,
  },
};

export default config; 