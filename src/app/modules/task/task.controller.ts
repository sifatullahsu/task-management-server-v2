import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { queryMaker } from 'mongoose-query-maker'
import { apiResponse, catchAsync } from '../../../shared'
import { taskQuery, taskSelector } from './task.constant'
import { iTask } from './task.interface'
import { TaskService as service } from './task.service'

const createData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.createData(req.body, req.user)

  apiResponse<iTask>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Task created successfull.',
    data: result
  })
})

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const query = queryMaker(req.query, req.user, taskQuery, taskSelector)
  const { result, meta } = await service.getAllData(query)

  apiResponse<iTask[]>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Tasks fetched successfull.',
    data: result,
    meta
  })
})

const getData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.getData(req.params.id)

  apiResponse<iTask>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Task fetched successfull.',
    data: result
  })
})

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.updateData(req.params.id, req.body)

  apiResponse<iTask>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Task updated successfull.',
    data: result
  })
})

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.deleteData(req.params.id)

  apiResponse<iTask>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Task deleted successfull.',
    data: result
  })
})

export const TaskController = {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData
}
