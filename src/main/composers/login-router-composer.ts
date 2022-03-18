import LoginRouter from '../../presentation/routers/login-router'
import AuthUseCase from '../../domain/use-cases/auth-use-case'
import EmailValidator from '../../utils/email-validator'
import LoadUserByEmailRepository from '../../infastructure/repositories/load-user-by-email-repository'
import Encrypter from '../../utils/encypter'
import TokenGenerator from '../../utils/token-generator'
import UpdateAccessTokenRepository from '../../infastructure/repositories/update-access-token-repository'
import db from '../../database/models'
import env from '../config/env'

const { User } = db

const loadUserByEmailRepository = new LoadUserByEmailRepository(User)
const encrypter = new Encrypter()
const tokenGenerator = new TokenGenerator(env.appSecret)
const updateAccessTokenRepository = new UpdateAccessTokenRepository(User)

const authUseCase = new AuthUseCase({
  loadUserByEmailRepository,
  encrypter,
  tokenGenerator,
  updateAccessTokenRepository
})

const emailValidator = new EmailValidator()
const loginRouter = new LoginRouter({ authUseCase, emailValidator })

export default loginRouter
