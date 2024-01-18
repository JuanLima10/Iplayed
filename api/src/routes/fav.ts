import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';


import { api } from '../lib/api';
import { GameParamsSchema, GameSchema } from '../types/Game';
import { UserSchema } from '../types/User';

const prisma = new PrismaClient()

export async function favPrivateRoutes(app: FastifyInstance){
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/fav/:slug', async (request) => {
    const { slug } = GameParamsSchema.parse(request.params);
    return await prisma.fav.findFirst({
      where: { slug, userId: request.user.sub },
      select: { id: true },
    })
  })

  app.post('/game/fav/:slug', async (request, reply) => {
    const { slug } = GameParamsSchema.parse(request.params);
    const gameExists = await prisma.game.findFirst({
      where: { slug },
      select: { id: true, userId: true },
    })
    const favExists = await prisma.fav.findFirst({
      where: { slug, userId: request.user.sub },
      select: { slug: true },
    })

    if(favExists){
      return reply.status(409).send({
        type: "Conflict", 
        message: "⚠️ Game is already a favorite"
      })
    }

    if(gameExists && gameExists.userId === request.user.sub){
      await prisma.fav.create({
        data: {
          slug: slug,
          gameId: gameExists.id,
          userId: request.user.sub,
        }
      })
      return reply.status(201).send({
        type: "Success", 
        message: "✅ Game added to favorites"
      })
    }

    const game = await prisma.game.create({
      data: { 
        slug: slug,
        userId: request.user.sub,
      }
    })
    
    await prisma.fav.create({
      data: {
        slug: slug,
        gameId: game.id,
        userId: request.user.sub,
      }
    })
    return reply.status(201).send({
      type: "Success", 
      message: "✅ Game added to favorites"
    })
  })

  app.delete('/game/fav/:id', async (request, reply) => {
    const { id } = GameSchema.parse(request.params)
    const game = await prisma.fav.findUniqueOrThrow({
      where: { id },
    })
    if(game.userId !== request.user.sub){
      return reply.status(401).send({
        type: "Unauthorized", 
        message: "✅ Game removed from favorites"
      })
    }
    await prisma.fav.delete({
      where: { id },
    })
    return reply.status(200).send({
      type: "Success", 
      message: "✅ Game removed from favorites"
    })
  })
}

export async function favPublicRoutes(app: FastifyInstance){
  app.get('/user/fav/:id', async (request, reply) => {
    const { id } = UserSchema.parse(request.params)

    const games = await prisma.fav.findMany({
      where: { userId: id },
      select: { slug: true },
    })
    if(games.length > 0){
      const igdb = await api.post('/games',
        `fields slug, name, cover.url; sort name asc; limit 4;
        where slug=(${String(games.map(game=>'"'+game.slug+'"'))});`)
        .then(res => res.data)
        .catch(err => (
          console.error(err), 
          reply.status(204).send({
            type: "Error", 
            message: "❌ Favorites not found"
          })
        ))
      return igdb
    }
    return null
  })

  app.get('/user/banner/:id', async (request, reply) => {
    const { id } = UserSchema.parse(request.params)

    const games = await prisma.fav.findMany({
      where: { userId: id },
      select: { slug: true },
    })
    if(games.length > 0){
      const igdb = await api.post('/games',
        `fields artworks.url; sort name asc; limit 4;
        where slug=(${String(games.map(game=>'"'+game.slug+'"'))});`)
        .then(res => res.data)
        .catch(err => (
          console.error(err), 
          reply.status(204).send({
            type: "Error", 
            message: "❌ Favorites not found"
          })
        ))
      const banner = igdb[Math.floor(Math.random() * 4)].artworks
      return banner
    }
    return null
  })
}