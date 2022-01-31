import {
  MissingParamError
} from '../../utils/errors'
import ILoadUserByEmailRepository from '../../infastructure/repositories/interfaces/ILoadUserByEmailRepository'
import AuthUseCase from './auth-use-case'
import IEncrypter from '../../utils/interfaces/IEncrypter'
import IUser from '../entities/interfaces/IUser'
import ITokenGenerator from '../../utils/interfaces/ITokenGenerator'
import IUpdateAccessTokenRepository from '../../infastructure/repositories/interfaces/IUpdateAccessTokenRepository'

class LoadUserByEmailRepositorySpy implements ILoadUserByEmailRepository {
  email : string
  user : IUser
  async load (email : string) : Promise<IUser> {
    this.email = email
    return this.user
  }
}

class EncrypterSpy implements IEncrypter {
  string : string
  hash : string
  isHashValid : boolean
  async compare (string : string, hash : string) : Promise<boolean> {
    this.string = string
    this.hash = hash
    return this.isHashValid
  }
}

class TokenGeneratorSpy implements ITokenGenerator {
  id: number
  token : string
  secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  async generate (userId : number) : Promise<string> {
    this.id = userId

    return this.token
  }
}

class UpdateAccessTokenRepositorySpy implements IUpdateAccessTokenRepository {
  userId: number
  accessToken: string
  wasSuccessful: boolean
  update (userId: number, accessToken: string): Promise<boolean> {
    this.userId = userId
    this.accessToken = accessToken
    return this.wasSuccessful
  }
}

const makeLoadUserByRepository = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    id: 1,
    password: 'hashed_password'
  }
  return loadUserByEmailRepositorySpy
}

const makeLoadUserByRepositoryWithError = () => {
  const loadUserByEmailRepositorySpyWithError = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpyWithError.load = (email : string) => {
    throw new Error()
  }
  return loadUserByEmailRepositorySpyWithError
}

const makeEncrypter = () => {
  const encrypterSpy = new EncrypterSpy()
  encrypterSpy.isHashValid = true
  return encrypterSpy
}

const makeEncrypterWithError = () => {
  const encrypterSpy = new EncrypterSpy()
  encrypterSpy.isHashValid = true
  encrypterSpy.compare = (string : string, hash : string) => {
    throw new Error()
  }
  return encrypterSpy
}

const makeTokenGenerator = () => {
  const tokenGeneratorSpy = new TokenGeneratorSpy('any_secret')
  tokenGeneratorSpy.token = 'access_token'
  return tokenGeneratorSpy
}

const makeTokenGeneratorWithError = () => {
  const tokenGeneratorSpy = new TokenGeneratorSpy('any_secret')
  tokenGeneratorSpy.token = 'access_token'
  tokenGeneratorSpy.generate = (id : number) => {
    throw new Error()
  }
  return tokenGeneratorSpy
}

const makeUpdateAccessTokenRepository = () => {
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  updateAccessTokenRepositorySpy.wasSuccessful = true
  return updateAccessTokenRepositorySpy
}

const makeUpdateAccessTokenRepositoryWithError = () => {
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  updateAccessTokenRepositorySpy.wasSuccessful = true
  updateAccessTokenRepositorySpy.update = (userId : number, accessToken : string) => {
    throw new Error()
  }
  return updateAccessTokenRepositorySpy
}

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByRepository()
  const encrypterSpy = makeEncrypter()
  const tokenGeneratorSpy = makeTokenGenerator()
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository()
  const sut = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encrypter: encrypterSpy,
    tokenGenerator: tokenGeneratorSpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy
  })

  return { sut, loadUserByEmailRepositorySpy, encrypterSpy, tokenGeneratorSpy, updateAccessTokenRepositorySpy }
}

describe('AuthUseCase', () => {
  test('it should throw an error if no email is provided', async () => {
    const { sut } = makeSut()

    const password = 'any_passowrd'
    const promise = sut.auth('', password)
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('it should throw an error if no password is provided', async () => {
    const { sut } = makeSut()

    const email = 'any_email@mail.com'
    const promise = sut.auth(email, '')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('it should call loadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()

    const email = 'any_email@mail.com'
    const password = 'any_password'

    await sut.auth(email, password)
    expect(loadUserByEmailRepositorySpy.email).toBe(email)
  })

  test('it should throw if invalid dependencies is provided', async () => {
    const invalidDependency = {}
    const loadUserByEmailRepository = makeLoadUserByRepository()
    const encrypter = makeEncrypter()
    const tokenGenerator = makeTokenGenerator()

    const suts = [].concat(
      new AuthUseCase(),
      new AuthUseCase({
        // No object was passed
        loadUserByEmailRepository: null,
        encrypter: null,
        tokenGenerator: null
      }),
      new AuthUseCase({
        // An invalid object was passed
        loadUserByEmailRepository: invalidDependency,
        encrypter: null,
        tokenGenerator: null
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter: null,
        tokenGenerator: null
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter: invalidDependency,
        tokenGenerator: null
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator: null
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator: invalidDependency
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator,
        updateAccessTokenRepository: null
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator,
        updateAccessTokenRepository: invalidDependency
      })
    )
    const email = 'any_email@mail.com'
    const password = 'any_password'
    for (const sut of suts) {
      const promise = sut.auth(email, password)
      // The toThrow() method is to say that the class won't deal with the error inside it
      expect(promise).rejects.toThrow()
    }
  })

  test('it should throw if any of the dependencies throws', async () => {
    const loadUserByEmailRepository = makeLoadUserByRepository()
    const encrypter = makeEncrypter()
    const tokenGenerator = makeTokenGenerator()

    const suts = [].concat(
      new AuthUseCase({
        loadUserByEmailRepository: makeLoadUserByRepositoryWithError()
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter: makeEncrypterWithError()
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator: makeTokenGeneratorWithError()
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator,
        updateAccessTokenRepository: makeUpdateAccessTokenRepositoryWithError()
      })
    )
    const email = 'any_email@mail.com'
    const password = 'any_password'
    for (const sut of suts) {
      const promise = sut.auth(email, password)
      // The toThrow() method is to say that the class won't deal with the error inside it
      expect(promise).rejects.toThrow()
    }
  })

  test('it should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null

    const email = 'invalid_email@mail.com'
    const password = 'any_password'

    const accessToken = await sut.auth(email, password)
    expect(accessToken).toBeNull()
  })

  test('it should return null if an invalid password is provided', async () => {
    const { sut, encrypterSpy } = makeSut()
    encrypterSpy.isHashValid = false

    const email = 'valid_email@mail.com'
    const password = 'invalid_password'

    const accessToken = await sut.auth(email, password)
    expect(accessToken).toBeNull()
  })

  test('it should call Encrypter with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut()

    const email = 'valid_email@mail.com'
    const password = 'any_password'

    await sut.auth(email, password)
    expect(encrypterSpy.string).toBe(password)
    expect(encrypterSpy.hash).toBe(loadUserByEmailRepositorySpy.user.password)
  })

  test('it should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, tokenGeneratorSpy, updateAccessTokenRepositorySpy } = makeSut()

    const email = 'valid_email@mail.com'
    const password = 'valid_password'

    await sut.auth(email, password)
    expect(updateAccessTokenRepositorySpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(tokenGeneratorSpy.token)
  })

  test('it should call TokenGenerator with correct userId', async () => {
    const { sut, loadUserByEmailRepositorySpy, tokenGeneratorSpy } = makeSut()

    const email = 'valid_email@mail.com'
    const password = 'valid_password'

    await sut.auth(email, password)
    expect(tokenGeneratorSpy.id).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('it should return an accessToken if correct credentials are provided', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()

    const email = 'valid_email@mail.com'
    const password = 'valid_password'

    const accessToken = await sut.auth(email, password)
    expect(accessToken).toBe(tokenGeneratorSpy.token)
    expect(accessToken).toBeTruthy()
  })
})
