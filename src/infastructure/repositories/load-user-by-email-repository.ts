import { Model } from 'sequelize'
import IUser from '../../domain/entities/interfaces/IUser'
import ILoadUserByEmailRepository from './interfaces/ILoadUserByEmailRepository'

export default class LoadUserByEmailRepository implements ILoadUserByEmailRepository {
  email: string
  user: IUser
  userModel: Model
  constructor (userModel : Model) {
    this.userModel = userModel
  }

  async load (email: string): Promise<IUser> {
    this.email = email
    this.user = await this.userModel.findOne({
      where: {
        email: this.email
      }
    })
    return this.user
  }
}
