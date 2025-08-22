import express from 'express';
import path from 'path';
import { sortNumbers } from './controller.js'
import { fileURLToPath } from 'url';

const PORT_DEFUALT = 3000

const app = express();
const PORT = process.env.PORT || PORT_DEFUALT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/sort-numbers', sortNumbers);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
