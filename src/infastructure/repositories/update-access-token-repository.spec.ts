
import db from './../../database/models'
import UpdateAccessTokenRepository from './update-access-token-repository'

import IUser from '../../domain/entities/interfaces/IUser'
import MissingParamError from '../../utils/errors/missing-param-error'

const { User } = db

const createFakeUser = async () : Promise<IUser> => {
  return await User.create({
    email: 'any_email@test.com',
    password: 'any_password'
  })
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
    let fakeUser = await createFakeUser()

    const { sut } = makeSut()

    const accessToken = 'any_token'

    await sut.update(fakeUser.id, accessToken)

    fakeUser = await User.findByPk(fakeUser.id)

    expect(fakeUser.accessToken).toBe(accessToken)
  })

  test('it should throw an error if no user model is provided', async () => {
    const fakeUser = await createFakeUser()

    const sut = new UpdateAccessTokenRepository()

    const accessToken = 'any_token'

    const promise = sut.update(fakeUser.id, accessToken)

    expect(promise).rejects.toThrow(new MissingParamError('userModel'))
  })

  test('it should throw an error if no user id is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.update()

    expect(promise).rejects.toThrow(new MissingParamError('userId'))
  })

  test('it should throw an error if no access token is provided', async () => {
    const fakeUser = await createFakeUser()

    const { sut } = makeSut()

    const promise = sut.update(fakeUser.id)

    expect(promise).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
