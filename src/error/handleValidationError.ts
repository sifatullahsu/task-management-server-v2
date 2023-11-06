import mongoose from 'mongoose'

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorMessages = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message
      }
    }
  )

  return {
    status: 400,
    message: 'Validation Error',
    errorMessages
  }
}

export default handleValidationError
