import { z } from 'zod'

const register = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required.'
    }),
    email: z
      .string({
        required_error: 'address is required.'
      })
      .email(),
    password: z.string({
      required_error: 'password is required.'
    })
  })
})

const login = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required.'
      })
      .email(),
    password: z.string({
      required_error: 'password is required.'
    })
  })
})

const refreshToken = z.object({
  body: z.object({
    refresh_token: z.string({
      required_error: 'refresh_token is required.'
    })
  })
})

export const AuthZod = {
  register,
  login,
  refreshToken
}
