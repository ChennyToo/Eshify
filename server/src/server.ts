import app from './app.js';
import config from './config/environment.js';

const { port } = config;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 