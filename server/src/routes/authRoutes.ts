import axios from 'axios';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodyShema = z.object({
      code: z.string(),
    });

    const { code } = bodyShema.parse(request.body);
    console.log('code', code);

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const { access_token } = accessTokenResponse.data;
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    });

    const userInfo = userSchema.parse(userResponse.data);

    let user = await prisma.user.findUnique({
      where: {
        githubid: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          avatarUrl: userInfo.avatar_url,
          name: userInfo.name,
          login: userInfo.login,
          githubid: userInfo.id,
        },
      });
    }
    // Definicao do token
    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      }
    );

    return {
      token,
    };
  });
}
