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
})
