import app from './src/app.js';
import config from './src/config/environment.js';

const { port } = config;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 