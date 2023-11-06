import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { apiResponse, catchAsync } from '../../../shared'
import { iUser } from '../user/user.interface'
import { iAuth, iRefreshTokenReturn } from './auth.interface'
import { AuthService as service } from './auth.service'

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await service.register(req.body)

  apiResponse<Partial<iUser>>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User registered successfull.',
    data: result
  })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await service.login(req.body)

  apiResponse<iAuth>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Login successfull.',
    data: result
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const result = await service.refreshToken(req.body.refresh_token)

  apiResponse<iRefreshTokenReturn>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'New access token.',
    data: result
  })
})

export const AuthController = {
  register,
  login,
  refreshToken
}
