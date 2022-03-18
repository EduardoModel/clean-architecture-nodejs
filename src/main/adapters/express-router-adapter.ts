import IHttpRequest from '../../presentation/interfaces/IHttpRequest'
import IHttpResponse from '../../presentation/interfaces/IHttpResponse'

export default class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest : IHttpRequest = {
        body: req.body
      }
      const httpResponse : IHttpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
