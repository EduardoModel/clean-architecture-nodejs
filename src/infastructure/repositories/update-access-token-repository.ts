import IUpdateAccessTokenRepository from './interfaces/IUpdateAccessTokenRepository'
import { Model } from 'sequelize'
import MissingParamError from '../../utils/errors/missing-param-error'

export default class UpdateAccessTokenRepository implements IUpdateAccessTokenRepository {
  userId: number
  accessToken: string
  wasSuccessful: boolean
  userModel: Model
  constructor (userModel : Model) {
    this.userModel = userModel
  }

  async update (userId: number, accessToken: string): Promise<void> {
    if (!this.userModel) {
      throw new MissingParamError('userModel')
    }
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }

    await this.userModel.update({
      accessToken
    },
    {
      where: {
        id: userId
      }
    })
  }
}
