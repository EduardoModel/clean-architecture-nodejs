import IAuthUseCase from './interfaces/IAuthUseCase'
import {
  MissingParamError
} from '../../utils/errors'
import ILoadUserByEmailRepository from '../../infastructure/interfaces/ILoadUserByEmailRepository'
import IEncrypter from '../../utils/interfaces/IEncrypter'
import ITokenGenerator from '../../utils/interfaces/ITokenGenerator'
import IUpdateAccessTokenRepository from '../../infastructure/interfaces/IUpdateAccessTokenRepository'

export default class AuthUseCase implements IAuthUseCase {
  email: string
  password: string
  accessToken?: string
  loadUserByEmailRepository: ILoadUserByEmailRepository
  encrypter: IEncrypter
  tokenGenerator: ITokenGenerator
  updateAccessTokenRepository: IUpdateAccessTokenRepository

  constructor (dependencies) {
    if (dependencies) {
      const {
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator,
        updateAccessTokenRepository
      } = dependencies
      this.loadUserByEmailRepository = loadUserByEmailRepository
      this.encrypter = encrypter
      this.tokenGenerator = tokenGenerator
      this.updateAccessTokenRepository = updateAccessTokenRepository
    }
  }

  async auth (email: string, password: string): Promise<string> {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)
    const isPasswordValid = user && await this.encrypter.compare(password, user.password)

    if (user && isPasswordValid) {
      const accessToken = await this.tokenGenerator.generate(user.id)
      await this.updateAccessTokenRepository.update(user.id, accessToken)
      return accessToken
    }
    return null
  }
}
