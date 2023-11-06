import { Router } from 'express'
import { validateRole, validateZod } from '../../middlewares'
import { ListController as controller } from './list.controller'
import { ListZod as zod } from './list.zod'

const router = Router()

router.post('/', validateZod(zod.createData), validateRole(['user']), controller.createData)
router.get('/with-task', controller.getAllDataWithTask)
router.get('/', controller.getAllData)
router.get('/:id', controller.getData)
router.patch('/:id', validateZod(zod.updateData), controller.updateData)
router.delete('/:id', controller.deleteData)

export const ListRoute = router
