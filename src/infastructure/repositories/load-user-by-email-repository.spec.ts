import MissingParamError from '../../utils/errors/missing-param-error'
import db from './../../database/models'
import LoadUserByEmailRepository from './load-user-by-email-repository'

const { User } = db

const makeSut = () => {
  const sut = new LoadUserByEmailRepository(User)
  return { sut }
}

describe('LoadUserByEmailRepository', () => {
  // Clean the database after each test
  beforeAll(() => {
    User.destroy({
      where: {},
      truncate: true
    })
  })

  test('it should return null if no user was found on the database', async () => {
    const { sut } = makeSut()

    const user = await sut.load('invalid_email@test.com')
    expect(user).toBeNull()
  })

  test('it should return an user if user was found', async () => {
    const email = 'valid_email@test.com'
    const password = 'any_password'
    await User.create({ email, password })

    const { sut } = makeSut()

    const user = await sut.load(email)

    expect(user.email).toBe(email)
    expect(user.password).toBe(password)
    expect(user.id).toBeTruthy()
  })

  test('it should throw an exception if no model is provided', async () => {
    const sut = new LoadUserByEmailRepository()

    const promise = sut.load('invalid_email@test.com')
    expect(promise).rejects.toThrow(new MissingParamError('userModel'))
  })

  test('it should throw an exception if no email is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
