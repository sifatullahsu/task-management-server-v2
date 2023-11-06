import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

type iCreateToken = (paylod: Record<string, unknown>, secret: string, expireTime: string) => string
type iVerifyToken = (token: string, secret: Secret) => JwtPayload

export const createToken: iCreateToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime })
}

export const verifyToken: iVerifyToken = (token, secret) => {
  return jwt.verify(token, secret) as JwtPayload
}
