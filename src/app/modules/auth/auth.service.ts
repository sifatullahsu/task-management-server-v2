/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status'
import config from '../../../config'
import ApiError from '../../../error/ApiError'
import { createToken, verifyToken } from '../../../shared'
import { iUser } from '../user/user.interface'
import User from '../user/user.model'
import { iAuth, iLoginReqData, iRefreshTokenReturn } from './auth.interface'

const register = async (data: iUser): Promise<Partial<iUser>> => {
  const result = await User.create(data)
  const { password, ...restData } = result.toObject()

  return restData
}

const login = async (data: iLoginReqData): Promise<iAuth | null> => {
  const { email, password } = data

  // email verification
  const result = await User.findOne({ email }, '+password -createdAt -updatedAt')
  if (!result) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.')

  // password verification
  const isPasswordValid = await User.checkPassword(password, result.password)
  if (!isPasswordValid) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.')

  const { password: removePassword, ...userinfo } = result.toObject()

  // generate tokens
  const tokenData = { _id: userinfo._id, email: userinfo.email, role: userinfo.role }
  const accessToken = createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)
  const refreshToken = createToken(tokenData, config.jwt.refreshSecret!, config.jwt.refreshExpiresIn!)

  const payload = {
    ...userinfo,
    access_token: accessToken,
    refresh_token: refreshToken
  }

  return payload
}

const refreshToken = async (data: string): Promise<iRefreshTokenReturn> => {
  const token = verifyToken(data, config.jwt.refreshSecret!)

  if (token) {
    const tokenData = { _id: token._id, uid: token.uid }
    const accessToken = createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)

    return { access_token: accessToken }
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired.')
  }
}

export const AuthService = {
  register,
  login,
  refreshToken
}
