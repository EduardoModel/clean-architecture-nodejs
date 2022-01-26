import LoginRouter from './login-router'
import IAuthUseCase from '../../domain/use-cases/interfaces/IAuthUseCase'
import {
  ServerError,
  UnauthorizedError
} from '../errors'

import {
  InvalidParamError,
  MissingParamError
} from '../../utils/errors'

import IEmailValidator from '../../utils/interfaces/IEmailValidator'

class AuthUseCaseSpy implements IAuthUseCase {
  email: string
  password: string
  accessToken = 'valid_token'

  auth (email, password) {
    this.email = email
    this.password = password
    return this.accessToken
  }
}

// Factory to create the system under test and the necessary libraries
const makeSut = () => {
  // Test double (more about the topic)

  class EmailValidatorSpy implements IEmailValidator {
    email: string
    isEmailValid = true

    isValid (email) {
      this.email = email
      return this.isEmailValid
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy()
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)
  return {
    sut,
    authUseCaseSpy,
    emailValidatorSpy
  }
}

describe('Login Router', () => {
  test('it should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new MissingParamError('email'))
  })

  test('it should return 400 if an invalid email provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false

    const httpRequest = {
      body: {
        email: 'invalid_email@test.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new InvalidParamError('email'))
  })

  test('it should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@test.com'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new MissingParamError('password'))
  })

  test('it should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route(null)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError())
  })

  test('it should return 500 if no body is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError())
  })

  test('it should call AuthUseCase with correct params', async () => {
    const {
      sut,
      authUseCaseSpy
    } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }
    await sut.route(httpRequest)

    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('it should return 401 when invalid credentials are provided', async () => {
    const {
      sut,
      authUseCaseSpy
    } = makeSut()

    authUseCaseSpy.accessToken = null

    const httpRequest = {
      body: {
        // This values is to give more semantic for the tests
        email: 'invalid_email@test.com',
        password: 'invalid_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body.error).toEqual(new UnauthorizedError())
  })

  test('it should return 200 when valid credentials are provided', async () => {
    const {
      sut,
      authUseCaseSpy
    } = makeSut()

    const httpRequest = {
      body: {
        // This values is to give more semantic for the tests
        email: 'valid_email@test.com',
        password: 'valid_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken)
  })

  /*
    Difference between 401 and 403:
    401: when the user isn't recognized
    403: when te user is recognized but doesn't have the permissions to access
    some resources

  */

  test('it should return 500 if no AuthUseCase is provided', async () => {
    const sut = new LoginRouter()

    const httpRequest = {
      body: {
        // This values is to give more semantic for the tests
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError())
  })

  test('it should return 500 if AuthUseCase has not auth method', async () => {
    const sut = new LoginRouter({})

    const httpRequest = {
      body: {
        // This values is to give more semantic for the tests
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError())
  })

  test('it should return 500 if AuthUseCase throws an error', async () => {
    class AuthUseCaseSpy implements IAuthUseCase {
      email: string
      password: string
      accessToken = 'valid_token'

      auth (email, password) {
        throw new Error('Error')
      }
    }

    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)

    const httpRequest = {
      body: {
        // This values is to give more semantic for the tests
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError())
  })

  test('it should return 500 if no EmailValidator is provided', async () => {
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)

    const httpRequest = {
      body: {
        // This values is to give more semantic for the tests
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError())
  })

  test('it should return 500 if EmailValidator has not isValid method', async () => {
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy, {})

    const httpRequest = {
      body: {
        // This values is to give more semantic for the tests
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError())
  })

  test('it should return 500 if EmailValidator throws an error', async () => {
    class EmailValidatorSpy implements IEmailValidator {
      email: string
      isEmailValid = true

      isValid (email) {
        throw new Error()
      }
    }

    const authUseCaseSpy = new AuthUseCaseSpy()
    const emailValidatorSpy = new EmailValidatorSpy()
    const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)

    const httpRequest = {
      body: {
        // This values is to give more semantic for the tests
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError())
  })

  test('it should call EmailValidator with correct param', async () => {
    const {
      sut,
      emailValidatorSpy
    } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }
    await sut.route(httpRequest)

    expect(emailValidatorSpy.email).toBe(httpRequest.body.email)
  })
})
