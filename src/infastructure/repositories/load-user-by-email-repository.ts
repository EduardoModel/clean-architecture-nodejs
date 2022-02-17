import { Model } from 'sequelize'
import IUser from '../../domain/entities/interfaces/IUser'
import MissingParamError from '../../utils/errors/missing-param-error'
import ILoadUserByEmailRepository from './interfaces/ILoadUserByEmailRepository'

export default class LoadUserByEmailRepository implements ILoadUserByEmailRepository {
  email: string
  user: IUser
  userModel: Model
  constructor (userModel : Model) {
    this.userModel = userModel
  }

  async load (email: string): Promise<IUser> {
    if (!this.userModel) {
      throw new MissingParamError('userModel')
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
