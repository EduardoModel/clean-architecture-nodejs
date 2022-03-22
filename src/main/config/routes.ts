/*
  To avoid this file to grow exponentialy as the application grows, it will be only
  responsable to get the routes scenarios from the routes folder and link them to the properly endpoints
*/
import express from 'express'
import fg from 'fast-glob'
const router = express.Router()

export default (app) => {
  // Set the prefix for the routes that will be added
  app.use('/api', router)
  fg.sync('**/src/main/routes/**.ts').forEach(async file => {
    const route = await import(`../../../${file}`)
    route.default(router)
  })
}
