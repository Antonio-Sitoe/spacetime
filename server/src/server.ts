import 'dotenv/config';
import fastify = require('fastify');
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { memoriesRoutes } from './routes/memories';

const app = fastify();
app.register(memoriesRoutes);
app.register(cors, {
  origin: true, // todas url de frontend podem acessar,
});
app.register(jwt, {
  secret: 'spacetime-XXP', // maneira de diferenciar os jwt desse backend dos outros backends
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running on http://localhost:3333');
  });
