import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import z from 'zod';

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async (req, res) => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      };
    });
  });
  app.get('/memories/:id', async (req, res) => {
    const paramsShema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsShema.parse(req.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return memory;
  });

  app.post('/memories', async (req, res) => {
    const bodyShema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });
    const { content, isPublic, coverUrl } = bodyShema.parse(req.body);
    const memory = await prisma.memory.create({
      data: {
        coverUrl,
        isPublic,
        content,
        userId: '9940eacc-a52c-4e69-b614-416b3668d333',
      },
    });
    console.log('memory', memory);
  });
  app.put('/memories/:id', async (req, res) => {
    const bodyShema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });
    const paramsShema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsShema.parse(req.params);
    const { content, isPublic, coverUrl } = bodyShema.parse(req.body);

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        coverUrl,
        isPublic,
        content,
        userId: '9940eacc-a52c-4e69-b614-416b3668d333',
      },
    });
    console.log('memory', memory);
    return memory;
  });
  app.delete('/memories/:id', async (req, res) => {
    const paramsShema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsShema.parse(req.params);

    const memory = await prisma.memory.delete({
      where: {
        id,
      },
    });

    return memory;
  });
}
