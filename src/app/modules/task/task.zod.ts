import { z } from 'zod'

const createData = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required.'
    }),
    list: z.string({
      required_error: 'list is required.'
    })
  })
})

const updateData = z
  .object({
    body: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      priority: z.string().optional(),
      position: z.number().int().min(1).optional(),
      list: z.string().optional()
    })
  })
  .refine(data => {
    if ((data.body.list && !data.body.position) || (!data.body.list && data.body.position)) {
      throw new Error('`position` & `list` both required to update list and position')
    }

    return true
  })

export const taskZod = {
  createData,
  updateData
}
