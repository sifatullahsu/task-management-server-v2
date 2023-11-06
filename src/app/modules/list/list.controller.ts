import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { queryMaker } from 'mongoose-query-maker'
import { apiResponse, catchAsync } from '../../../shared'
import { ListQuery, listSelector } from './list.constant'
import { iList } from './list.interface'
import { ListService as service } from './list.service'

const createData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.createData(req.body, req.user)

  apiResponse<iList>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'List created successfull.',
    data: result
  })
})

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const query = queryMaker(req.query, req.user, ListQuery, listSelector)
  const { result, meta } = await service.getAllData(query)

  apiResponse<iList[]>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Lists fetched successfull.',
    data: result,
    meta
  })
})

const getData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.getData(req.params.id)

  apiResponse<iList>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'List fetched successfull.',
    data: result
  })
})

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.updateData(req.params.id, req.body)

  apiResponse<iList>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'List updated successfull.',
    data: result
  })
})

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.deleteData(req.params.id)

  apiResponse<iList>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'List deleted successfull.',
    data: result
  })
})

const getAllDataWithTask = catchAsync(async (req: Request, res: Response) => {
  const result = await service.getAllDataWithTask(req.user)

  apiResponse<iList[]>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Lists fetched successfull.',
    data: result
  })
})

export const ListController = {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData,
  getAllDataWithTask
}
