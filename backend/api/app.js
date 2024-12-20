/**
 * @description harmony API
 */
import manufacturerRouter from './routes/manufacturer.js';
import brandRouter from './routes/brand.js';
import express from 'express';

const port = 5000;
const app = express();
app.use(express.json());
app.get('/', (request, response) => {
  return response.status(200).json('Welcome to harmony');
});
app.use('/api/', manufacturerRouter);
app.use('/api/', brandRouter);
app.listen(port, () => {
  console.log('Running on  port ' + port);
});
