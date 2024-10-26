import express from 'express';
import storage from '../models/engine/db_storage.js';

const setup = async () => {
  await storage.setup_db()
}
setup();

const app = express();
const PORT = process.env.port || 3000;

app.get('/', (request, response) => {
  response.send({
    name: 'okibe',
    status: 'active',
  })
})
app.listen(PORT);
