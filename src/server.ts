import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  await mongoose.connect(config.database as string)
  console.log('🛢 Database is connected successfully')

  app.listen(config.port, () => {
    console.log(`🛢 Application running port ${config.port}`)
  })
}

main()
