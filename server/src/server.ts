import fastify = require('fastify');
import cors from '@fastify/cors';
import { memoriesRoutes } from './routes/memories';

const app = fastify();
app.register(memoriesRoutes);
app.register(cors, {
  origin: true, // todas url de frontend podem acessar,
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running on http://localhost:3333');
  });
