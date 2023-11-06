import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route'
import { ListRoute } from '../modules/list/list.route'
import { TaskRoute } from '../modules/task/task.route'
import { UserRoute } from '../modules/user/user.route'

const AppRouter = express.Router()

AppRouter.use('/api/v1/auth', AuthRoute)
AppRouter.use('/api/v1/users', UserRoute)
AppRouter.use('/api/v1/tasks', TaskRoute)
AppRouter.use('/api/v1/lists', ListRoute)

export default AppRouter
