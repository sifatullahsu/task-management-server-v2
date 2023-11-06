import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { queryMaker } from 'mongoose-query-maker'
import { apiResponse, catchAsync } from '../../../shared'
import { userQuery, userSelector } from './user.constaint'
import { iUser } from './user.interface'
import { UserService as service } from './user.service'

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const query = queryMaker(req.query, req.user, userQuery, userSelector)
  const { result, meta } = await service.getAllData(query)

  apiResponse<iUser[]>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Users fetched successfull.',
    data: result,
    meta
  })
})

const getData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.getData(req.params.id)

  apiResponse<iUser>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User fetched successfull.',
    data: result
  })
})

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.updateData(req.params.id, req.body)

  apiResponse<iUser>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User updated successfull.',
    data: result
  })
})

export const UserController = {
  getAllData,
  getData,
  updateData
}
