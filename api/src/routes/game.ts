import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { GameParamsSchema, GameSchema } from '../types/Game';
import { UserParamsSchema } from '../types/User';

const prisma = new PrismaClient()

export async function gamePrivateRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/game/:slug', async (request, reply) => {
    const { slug } = GameParamsSchema.parse(request.params);
    const { rating, review } = GameSchema.parse(request.body);
    const gameExists = await prisma.game.findFirst({
      where: { slug, userId: request.user.sub },
      select: { userId: true },
    })
    if(gameExists){
      await prisma.game.updateMany({
        where: { slug, userId: request.user.sub },
        data: { 
          slug,
          rating,
          review,
          userId: request.user.sub,
        }
      })
      return reply.status(201).send({
        type: "Success", 
        message: "✅ Review posted with successfully"
      })
    }
    await prisma.game.create({
      data: { 
        slug,
        rating, 
        review,
        userId: request.user.sub,
      }
    })
    return reply.status(201).send({
      type: "Success", 
      message: "✅ Success"
    })
  })

  app.get('/game/user/:slug', async (request) => {
    const { slug } = GameParamsSchema.parse(request.params);
    return await prisma.game.findFirst({
      where: {
        slug: slug,
        userId: request.user.sub,
      },
      select: {
        rating: true,
        review: true,
        likes: { select: { id:true } },
        wish: { select: { id:true } },
      }
    })
  })

  app.put('/game/:id', async (request, reply) => {
    const { id } = GameSchema.parse(request.params)
    const { rating, review } = GameSchema.parse(request.body)

    let game = await prisma.game.findUniqueOrThrow({
      where: { id },
    })

    if(game.userId !== request.user.sub){
      return reply.status(401).send({
        type: "Error", 
        message: "❌ Something went wrong"
      })
    }

    return await prisma.game.update({
      where: { id },
      data: { 
        rating, 
        review,
        userId: request.user.sub,
      }
    })
  })

  app.delete('/game/:id', async (request, reply) => {
    const { id } = GameSchema.parse(request.params)

    const game = await prisma.game.findUniqueOrThrow({
      where: { id },
    })
    if(game.userId !== request.user.sub){
      return reply.status(401).send({
        type: "Error", 
        message: "❌ Something went wrong"
      })
    }
    await prisma.game.delete({
      where: { id },
    })
  })
}

export async function gamePublicRoutes(app: FastifyInstance) {
  app.get('/game/ratings/:slug', async (request) => {
    const { slug } = GameParamsSchema.parse(request.params)

    const game = await prisma.game.findMany({
      where: {
        slug: slug,
        rating: {not: null}
      },
      select: {
        rating: true,
        review: true,
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          }
        },
      },
    });
    const ratings = game.map(r => r.rating);
    var rating_sum = 0
    for(var i = 0; i < ratings.length; i++) {
      rating_sum += Number(ratings[i]);
    }
    const rating_count = rating_sum / ratings.length;
    return {
      ratings, 
      rating_sum,
      rating_count
    };
  })

  app.get('/game/info/:slug', async (request) => {
    const { slug } = GameParamsSchema.parse(request.params)

    const plays = await prisma.game.aggregate({
      _count: {
        rating: true,
      },
      where: { slug: slug, rating: { not: null } },
    })
    const wish = await prisma.wish.aggregate({
      _count: {
        id: true,
      },
      where: { slug: slug },
    })
    const likes = await prisma.like.aggregate({
      _count: {
        id: true,
      },
      where: { slug: slug },
    })
    return {
      plays: plays._count.rating, 
      likes: likes._count.id, 
      wish: wish._count.id
    }
  })

  app.get('/game/:id/:slug', async (request) => {
    const { id } = UserParamsSchema.parse(request.params)
    const { slug } = GameParamsSchema.parse(request.params)
    
    return await prisma.game.findFirst({
      where: {
        slug: slug,
        userId: id,
      },
      select: {
        rating: true,
        review: true,
        likes: { select: { id:true } },
        wish: { select: { id:true } },
      }
    })
  })
}