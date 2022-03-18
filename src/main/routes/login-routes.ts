import loginRouter from '../composers/login-router-composer'

export default (router) => {
  router.post('/login', async (req, res) => {
    loginRouter.route(req)
  })
}
