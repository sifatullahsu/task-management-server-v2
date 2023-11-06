import { Router } from 'express'
import { validateZod } from '../../middlewares'
import { AuthController as controller } from './auth.controller'
import { AuthZod as zod } from './auth.zod'

const router = Router()

router.post('/register', validateZod(zod.register), controller.register)
router.post('/login', validateZod(zod.login), controller.login)
router.post('/refresh-token', validateZod(zod.refreshToken), controller.refreshToken)

export const AuthRoute = router
