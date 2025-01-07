import { FastifyInstance } from 'fastify'



import { authenticate } from './authenticate'
import { profile } from './profile'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}