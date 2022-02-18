import IUpdateAccessTokenRepository from './interfaces/IUpdateAccessTokenRepository'

import db from './../../database/models'
import { Model } from 'sequelize'
import IUser from '../../domain/entities/interfaces/IUser'
import MissingParamError from '../../utils/errors/missing-param-error'

const { User } = db

class UpdateAccessTokenRepository implements IUpdateAccessTokenRepository {
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

const makeSut = () => {
  const sut = new UpdateAccessTokenRepository(User)
  return { sut }
}

describe('UpdateAccessTokenRepository', () => {
  // Clean the database after each test
  beforeEach(() => {
    User.destroy({
      where: {},
      truncate: true
    })
  })

  test('it should update the user with the given accessToken', async () => {
    let fakeUser : IUser = await User.create({
      email: 'any_email@test.com',
      password: 'any_password'
    })

    const { sut } = makeSut()

    const accessToken = 'any_token'

    await sut.update(fakeUser.id, accessToken)

    fakeUser = await User.findByPk(fakeUser.id)

    expect(fakeUser.accessToken).toBe(accessToken)
  })

  test('it should throw an error if no user model is provided', async () => {
    const fakeUser : IUser = await User.create({
      email: 'any_email@test.com',
      password: 'any_password'
    })

    const sut = new UpdateAccessTokenRepository()

    const accessToken = 'any_token'

    const promise = sut.update(fakeUser.id, accessToken)

    expect(promise).rejects.toThrow(new MissingParamError('userModel'))
  })
})
