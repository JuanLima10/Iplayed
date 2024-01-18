import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import fastify from "fastify";

import { favPrivateRoutes, favPublicRoutes } from './routes/fav';
import { gamePrivateRoutes, gamePublicRoutes } from './routes/game';
import { likePrivateRoutes, likePublicRoutes } from './routes/like';
import { reviewRoutes } from './routes/review';
import { userPrivateRoutes, userPublicRoutes } from './routes/user';
import { wishPrivateRoutes, wishPublicRoutes } from './routes/wish';

const app = fastify()

app.register(cors, {
  origin: [ `${process.env.WEB_URL}`],
})

app.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
})

app.register(userPublicRoutes)
app.register(userPrivateRoutes)

app.register(gamePublicRoutes)
app.register(gamePrivateRoutes)

app.register(favPublicRoutes)
app.register(favPrivateRoutes)

app.register(likePublicRoutes)
app.register(likePrivateRoutes)

app.register(wishPublicRoutes)
app.register(wishPrivateRoutes)

app.register(reviewRoutes)

app.listen({
  port: Number(process.env.PORT)||3333,
}).then(() => {
  console.log('HTTP Server running')
})