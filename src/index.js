import express from 'express';

const app = express();
const PORT = process.env.port || 3000;

app.get('/', (request, response, next) => {
  response.send({
    name: 'okibe',
    status: 'active',
  })
})
app.listen(PORT);
