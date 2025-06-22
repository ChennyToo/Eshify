import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  danbooru: {
    baseUrl: process.env.DANBOORU_API_BASE_URL || 'https://danbooru.donmai.us',
    apiKey: process.env.DANBOORU_API_KEY,
    apiUser: process.env.DANBOORU_API_USER,
    nthPostLimit: process.env.DANBOORU_NTH_POST_LIMIT ? parseInt(process.env.DANBOORU_NTH_POST_LIMIT, 10) : 100, // Any API call will not grab an image from the artist that is past the nth image
  },
};

export default config; 