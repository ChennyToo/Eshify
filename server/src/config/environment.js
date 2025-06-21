import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  danbooru: {
    baseUrl: process.env.DANBOORU_API_BASE_URL || 'https://danbooru.donmai.us',
    apiKey: process.env.DANBOORU_API_KEY,
    apiUser: process.env.DANBOORU_API_USER,
  },
};

export default config; 