import { Router } from 'express'
import { validateZod } from '../../middlewares'
import { UserController as controller } from './user.controller'
import { UserZod as zod } from './user.zod'

const router = Router()

router.get('/', controller.getAllData)
router.get('/:id', controller.getData)
router.patch('/:id', validateZod(zod.updateData), controller.updateData)

export const UserRoute = router
