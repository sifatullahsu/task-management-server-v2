import { NextFunction, Request, Response } from 'express'
import config from '../../../config'
import { iJwtUser } from '../../../interface'
import { verifyToken } from '../../../shared/files/jwtHelper'

const reqUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (token) {
        const verify = verifyToken(token, config.jwt.secret as string)
        req.user = verify as iJwtUser
      } else {
        req.user = null
      }

      next()
    } catch (error) {
      req.user = null
      next()
    }
  }
}

export default reqUser
