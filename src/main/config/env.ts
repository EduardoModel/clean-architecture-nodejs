import 'dotenv/config'

export default {
  appSecret: process.env.APP_SECRET || 'secret',
  port: process.env.APP_PORT || 8000
}
