import HttpResponses from './helpers/http-responses'
import IHttpRequest from './../interfaces/IHttpRequest'
import IHttpResponse from './../interfaces/IHttpResponse'
import IAuthUseCase from '../../domain/use-cases/interfaces/IAuthUseCase'
import {
  MissingParamError,
  InvalidParamError
} from '../../utils/errors'
import IEmailValidator from '../../utils/interfaces/IEmailValidator'

export default class LoginRouter {
  authUseCase : IAuthUseCase
  emailValidator : IEmailValidator

  constructor (dependencies) {
    if (dependencies) {
      const { authUseCase, emailValidator } = dependencies
      this.authUseCase = authUseCase
      this.emailValidator = emailValidator
    }
  }

  async route (httpRequest: IHttpRequest) : Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponses.badRequest(new MissingParamError('email'))
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpResponses.badRequest(new InvalidParamError('email'))
      }

      if (!password) {
        return HttpResponses.badRequest(new MissingParamError('password'))
      }

      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponses.unauthorizedError()
      }
      return HttpResponses.ok({ accessToken })
    } catch (e) {
      // Here would be the place to protocoll the error with a tool like sentry
      // Because the server errors will be falling in this area
      return HttpResponses.serverError()
    }
  }
}
