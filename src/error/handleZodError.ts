import { ZodError, ZodIssue } from 'zod'

const handleZodError = (error: ZodError) => {
  const errorMessages = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message
    }
  })

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages
  }
}

export default handleZodError
