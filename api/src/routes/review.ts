import { FastifyInstance } from "fastify";
import { UserParamsSchema, UserQuerySchema } from "../types/User";

import { PrismaClient } from '@prisma/client';

import { api } from '../lib/api';
import { GameParamsSchema } from "../types/Game";
import { concatArray } from '../utils/concatArray';

const prisma = new PrismaClient()

export async function reviewRoutes(app: FastifyInstance){
  app.get('/game/reviews', async (request, reply) => {
    const { limit, offset } = UserQuerySchema.parse(request.query);
    const { _count } = await prisma.game.aggregate({
      _count: {
        review: true,
      },
      where: { review: { not: null || "" } },
    })

    if(_count.review > 0){
      const review = await prisma.game.findMany({
        where: {
          review: { not: null || "" },
        },
        select: {
          id: true,
          slug: true,
          rating: true,
          review: true,
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            }
          }
        },
        take: Number(limit),
        skip: Number(offset) > _count.review - 1 ? _count.review - 1 : Number(offset),
      })
      const igdb = await api.post('/games',
        `fields slug, name, cover.url; limit ${limit};
        where slug=(${String(review.map(game=>'"'+game.slug+'"'))});`)
        .then(res => res.data)
      const concat = concatArray(igdb.concat(review))
      return {
        data: concat,
        count: _count.review
      }
    }
    return {
      data: null,
      count: _count.review,
    }
  })

  app.get('/game/reviews/:slug', async (request, reply) => {
    const { slug } = GameParamsSchema.parse(request.params);
    const { limit, offset } = UserQuerySchema.parse(request.query);

    const { _count } = await prisma.game.aggregate({
      _count: {
        review: true,
      },
      where: { slug: slug, review: { not: null || "" } },
    })

    if(_count.review > 0){
      const review = await prisma.game.findMany({
        where: {
          slug: slug,
          review: { not: null || "" },
        },
        select: {
          id: true,
          slug: true,
          rating: true,
          review: true,
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            }
          }
        },
        take: Number(limit),
        skip: Number(offset) > _count.review - 1 ? _count.review - 1 : Number(offset),
      })
      return {
        data: review,
        count: _count.review
      }
    }
    return {
      data: null,
      count: _count.review
    }
  })

  app.get('/user/reviews/:id', async (request, reply) => {
    const { id } = UserParamsSchema.parse(request.params);
    const { limit, offset } = UserQuerySchema.parse(request.query);

    const {_count} = await prisma.game.aggregate({
      _count: {
        review: true,
      },
      where: { userId: id, review: { not: null || "" } },
    })

    if(_count.review > 0){
      const review = await prisma.game.findMany({
        where: {
          userId: id,
          review: { not: null || "" },
        },
        select: {
          id: true,
          slug: true,
          rating: true,
          review: true,
          user: {
            select: {
              id: true,
              name: true,
            }
          }
        },
        take: Number(limit),
        skip: Number(offset) > _count.review - 1 ? _count.review - 1 : Number(offset),
        orderBy: { created_at: 'desc' }
      })

      const igdb = await api.post('/games',
        `fields slug, name, cover.url; limit ${limit};
        where slug=(${String(review.map(game=>'"'+game.slug+'"'))});`)
        .then(res => res.data)
      const concat = concatArray(igdb.concat(review))
      return {
        data: concat,
        count: _count.review
      }
    }
    return {
      data: null,
      count: _count.review,
    }
  })

  app.get('/game/most-reviewed', async (request, reply) => {
    const game = await prisma.game.groupBy({
      by: ['slug'],
      where: { review: { not: null } },
      orderBy: {_count: {review: 'desc'}},
      take: 12,
    })
    return await api.post('/games',
      `fields slug, name, cover.url; limit 12;
      where slug=(${String(game.map(game=>'"'+game.slug+'"'))});`)
      .then(res => res.data)
      .catch((err) => (
        console.error(err),
        reply.status(204).send({
          type: "Error",
          message: "❌ Review not found"
        })
      ))
  })
}