import { z } from 'zod'

const createData = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required.'
    })
  })
})

const updateData = z.object({
  body: z.object({
    title: z.string().optional(),
    position: z.number().int().min(1).optional()
  })
})

export const ListZod = {
  createData,
  updateData
}
