import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { api } from '../lib/api';

import { GameParamsSchema, GameSchema } from '../types/Game';
import { QueryAuthSchema } from '../types/Query';
import { UserQuerySchema, UserSchema } from '../types/User';

const prisma = new PrismaClient()

export async function wishPrivateRoutes(app: FastifyInstance){
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/wish/:slug', async (request) => {
    const { slug } = GameParamsSchema.parse(request.params);
    const wish = await prisma.wish.findFirst({
      where: { slug, userId: request.user.sub },
      select: { id: true },
    })
    return wish
  })

  app.post('/game/wish/:slug', async (request, reply) => {
    const { slug } = GameParamsSchema.parse(request.params);
    const gameExists = await prisma.game.findFirst({
      where: { slug },
      select: { id: true, userId: true },
    })
    const wishExists = await prisma.wish.findFirst({
      where: { slug, userId: request.user.sub },
      select: { slug: true },
    })
    if(wishExists){
      return reply.status(409).send({
        type: "Conflict", 
        message: "⚠️ Game is alreary on like list"
      })
    }

    if(gameExists && gameExists.userId === request.user.sub){
      await prisma.wish.create({
        data: {
          slug: slug,
          gameId: gameExists.id,
          userId: request.user.sub,
        }
      })
      return reply.status(201).send({
      type: "Success", 
      message: "✅ Game added to wishlist"
    })
    }

    const game = await prisma.game.create({
      data: { 
        slug: slug,
        userId: request.user.sub,
      }
    })
    
    await prisma.wish.create({
      data: {
        slug: slug,
        gameId: game.id,
        userId: request.user.sub,
      }
    })
    return reply.status(201).send({
      type: "Success", 
      message: "✅ Game added to wishlist"
    })
  })

  app.delete('/game/wish/:id', async (request, reply) => {
    const { id } = GameSchema.parse(request.params)
    const game = await prisma.wish.findUniqueOrThrow({
      where: { id },
    })

    if(game.userId !== request.user.sub){
      return reply.status(401).send({
        type: "Error", 
        message: "❌ Something went wrong"
      })
    }

    await prisma.wish.delete({
      where: { id },
    })
  })

}

export async function wishPublicRoutes(app: FastifyInstance){
  app.get('/user/wish/:id', async (request, reply) => {
    const { id } = UserSchema.parse(request.params)
    const { limit, offset } = UserQuerySchema.parse(request.query)
    const { token } = QueryAuthSchema.parse(request.query)

    const {_count} = await prisma.wish.aggregate({
      _count: {
        id: true,
      },
      where: { userId: id },
    })

    if(_count.id > 0){
      const games = await prisma.wish.findMany({
        where: { userId: id },
        select: { slug: true },
        take: Number(limit),
        skip: Number(offset) > _count.id - 1 ? _count.id - 1 : Number(offset),
        orderBy: { games: { slug: 'asc' } }
      })
      const igdb = await api.post('/games',
        `fields slug, name, cover.url; sort name asc; limit ${limit};
        where slug=(${String(games.map(game=>'"'+game.slug+'"'))});`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.data)
        .catch(err => (reply.status(204).send({
          type: "Error", 
          message: "❌ Wish games not found"
        })
      ))
      return {
        data: igdb,
        count: _count.id,
      }
    }
    return {
      data: null,
      count: _count.id,
    }
  })
}