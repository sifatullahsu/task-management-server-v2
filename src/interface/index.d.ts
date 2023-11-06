import { JwtPayload } from 'jsonwebtoken'
import { iRole } from '../global/types'

export type iJwtUser =
  | (JwtPayload & {
      _id: string
      username: string
      role: iRole
    })
  | null

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user: iJwtUser
    }
  }
}
