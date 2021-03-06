import IUser from '../../domain/entities/interfaces/IUser'
import MissingParamError from '../../utils/errors/missing-param-error'
import ILoadUserByEmailRepository from './interfaces/ILoadUserByEmailRepository'

export default class LoadUserByEmailRepository implements ILoadUserByEmailRepository {
  email: string
  user: IUser
  userModel: any
  constructor (userModel: any) {
    this.userModel = userModel
  }

  async load (email: string): Promise<IUser> {
    if (!this.userModel) {
      throw new MissingParamError('userModel')
    }
    if (!email) {
      throw new MissingParamError('email')
    }
    this.email = email
    this.user = await this.userModel.findOne({
      where: {
        email: this.email
      }
    })
    return this.user
  }
}
