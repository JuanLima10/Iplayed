import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

import axios from "axios";
import { api } from "../lib/api";

import { QueryAuthSchema } from "../types/Query";
import { DiscordSchema, UserParamsSchema, UserQuerySchema, UserSchema } from "../types/User";
import { concatArray } from "../utils/concatArray";

const url = require("url");
const prisma = new PrismaClient();

export async function userPublicRoutes(app: FastifyInstance){
  app.get('/user', async () => {
    const user = await prisma.user.findMany({
      orderBy: { login: 'asc' },
      select: {
        id: true,
        name: true,
        login: true,
        avatarUrl: true,
      }
    });
    return user;
  });

  app.get('/user/:id', async (request) => {
    const { id } = UserParamsSchema.parse(request.params)
    return await prisma.user.findUnique({
      where: { id: id },
    })
  })

  app.get('/api/auth/discord/redirect', async (request, reply) => {
    const { code } = UserParamsSchema.parse(request.query);
    
    if(code){
      const formdata = new url.URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        redirect_uri: 'https://iplayed.onrender.com/api/auth/discord/redirect',
      });

      const access = await axios.post(
        'https://discord.com/api/v10/oauth2/token', 
          formdata, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
      })
  
      if(access.data){
        const { access_token } = access.data
        const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          }
        })
        const userInfo = DiscordSchema.parse(userResponse.data)
        let user = await prisma.user.findUnique({
          where: {
            discordId: userInfo.id,
          }
        })
    
        if(!user) {
          user = await prisma.user.create({
            data: {
              discordId: userInfo.id,
              email: userInfo.email,
              login: userInfo.username,
              name: userInfo.global_name,
              avatarUrl: `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}`,
            }
          })
        }

        user = await prisma.user.update({
          where: {
            discordId: userInfo.id,
          },
          data: {
            avatarUrl: `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}`,
          }
        })
    
        const token = app.jwt.sign({
          name: user.name,
          login: user.login,
          avatarUrl: user.avatarUrl,
        }, {
          sub: user.id,
          expiresIn: '90 days',
        })
        reply.redirect(`${process.env.WEB_URL}/api/auth/callback?token=${token}`)
      }
    }
  })

  app.get('/user/profile/:id', async (request) => {
    const { id } = UserParamsSchema.parse(request.params)
    const { token } = QueryAuthSchema.parse(request.query)

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        login: true,
        email: true,
        avatarUrl: true,
        favs: { select: { slug: true }, take: 4 }
      },
    });

    const favs = user?.favs && user?.favs.length > 0 && 
    await api.post('/games',
      `fields slug, name, cover.url, screenshots.url, artworks.url; limit 4;
      where slug=(${String(user?.favs.map(game=>'"'+game.slug+'"'))});`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.data)
    return {
      user, 
      favs
    }
  })

  app.get('/user/ratings/:id', async (request, reply) => {
    const { id } = UserParamsSchema.parse(request.params)
    const { limit, offset } = UserQuerySchema.parse(request.query)
    const { token } = QueryAuthSchema.parse(request.query)

    const {_count} = await prisma.game.aggregate({
      _count: {
        rating: true,
      },
      where: { userId: id, rating: { not: null || 0 } },
    })

    if(_count.rating > 0){
      const rating = await prisma.game.findMany({
        where: {
          userId: id,
          rating: { not: null || 0 },
        },
        select: {
          slug: true, 
          rating: true
        },
        take: Number(limit),
        skip: Number(offset) > _count.rating - 1 ? _count.rating - 1 : Number(offset),
        orderBy: { created_at: 'desc' }
      })
      
      const igdb = await api.post('/games',
        `fields slug, name, cover.url; limit ${limit}; sort name asc;
        where slug=(${String(rating.map(game=>'"'+game.slug+'"'))});`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.data)
      const concat = concatArray(igdb.concat(rating))
        .map((res: any) => res.data)
      return {
        data: concat,
        count: _count.rating
      }
    }
    return {
      data: null,
      count: _count.rating,
    }
  })

  app.get('/user/info/:id', async (request) => {
    const { id } = UserParamsSchema.parse(request.params);
    const like = await prisma.like.aggregate({
      _count: {
        id: true,
      },
      where: { userId: id },
    })
    const wish = await prisma.wish.aggregate({
      _count: {
        id: true,
      },
      where: { userId: id },
    })
    const ratings = await prisma.game.aggregate({
      _count: {
        rating: true,
      },
      where: { userId: id, rating: { not: null || 0 } },
    })
    const reviews = await prisma.game.aggregate({
      _count: {
        review: true,
      },
      where: {  userId: id, review: { not: null } },
    })

    return {
      wish: wish._count.id,
      like: like._count.id,
      ratings: ratings._count.rating,
      reviews: reviews._count.review,
    }
  })
  
}

export async function userPrivateRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.put('/user/:id', async (request, reply) => {
    const { id } = UserParamsSchema.parse(request.params)
    const { name, email } = UserSchema.parse(request.body)

    let user = await prisma.user.findUniqueOrThrow({
      where: { id },
    })

    if(user.id !== request.user.sub){
      return reply.status(401).send({
        type: "Error", 
        message: "❌ Something went wrong"
      })
    }

    if(name === user.name && email === user.email){
      return reply.status(401).send({
        type: "Conflict", 
        message: "⚠️ You put the same informations"
      })
    }

    await prisma.user.update({
      where: { id },
      data: { 
        name,
        email,
      }
    })
    return reply.status(201).send({
      type: "Success",
      message: "✅ Informations updated successfully"
    })
  })

}