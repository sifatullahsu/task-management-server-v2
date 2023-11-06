import { Router } from 'express'
import { validateRole, validateZod } from '../../middlewares'
import { TaskController as controller } from './task.controller'
import { taskZod as zod } from './task.zod'

const router = Router()

router.post('/', validateZod(zod.createData), validateRole(['user']), controller.createData)
router.get('/', controller.getAllData)
router.get('/:id', controller.getData)
router.patch('/:id', validateZod(zod.updateData), controller.updateData)
router.delete('/:id', controller.deleteData)

export const TaskRoute = router
