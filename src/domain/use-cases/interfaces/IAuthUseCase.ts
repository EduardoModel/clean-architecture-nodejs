import ILoadUserByEmailRepository from '../../../infastructure/interfaces/ILoadUserByEmailRepository'
import IUpdateAccessTokenRepository from '../../../infastructure/interfaces/IUpdateAccessTokenRepository'
import IEncrypter from '../../../utils/interfaces/IEncrypter'
import ITokenGenerator from '../../../utils/interfaces/ITokenGenerator'

export default interface IAuthUseCase {
  email: string
  password: string
  accessToken?: string
  loadUserByEmailRepository : ILoadUserByEmailRepository
  encrypter : IEncrypter
  tokenGenerator : ITokenGenerator
  updateAccessTokenRepository: IUpdateAccessTokenRepository
  auth(email: string, password: string) : Promise<string>
}
