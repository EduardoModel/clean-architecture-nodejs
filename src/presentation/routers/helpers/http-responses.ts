import IHttpResponse from '../../interfaces/IHttpResponse'
import {
  ServerError,
  UnauthorizedError
} from '../../errors'

export default class HttpResponses {
  static badRequest (error) : IHttpResponse {
    return {
      statusCode: 400,
      // To give better feedback about the missing fields a personalized error was created
      body: { error }
    }
  }

  static serverError () : IHttpResponse {
    return {
      statusCode: 500,
      body: {
        error: new ServerError()
      }
    }
  }

  static unauthorizedError () : IHttpResponse {
    return {
      statusCode: 401,
      body: { error: new UnauthorizedError() }
    }
  }

  static ok (bodyContent) : IHttpResponse {
    return {
      statusCode: 200,
      body: {
        ...bodyContent
      }
    }
  }
}
