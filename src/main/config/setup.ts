import corsMiddleware from './../middlewares/cors'

export default (app) => {
  app.disable('x-powered-by')
  app.use(corsMiddleware)
}
