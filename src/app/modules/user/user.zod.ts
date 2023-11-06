import { z } from 'zod'
import { xRole } from '../../../global/constant'

const updateData = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    // @ts-ignore
    role: z.enum(xRole).optional()
  })
})

export const UserZod = {
  updateData
}
