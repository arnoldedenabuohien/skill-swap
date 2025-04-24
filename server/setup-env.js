import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = `MONGO_URI=mongodb://localhost:27017/skillswap
PORT=5001`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created successfully!');
  console.log('MongoDB URI: mongodb://localhost:27017/skillswap');
  console.log('Port: 5001');
} catch (error) {
  console.error('Error creating .env file:', error.message);
} 