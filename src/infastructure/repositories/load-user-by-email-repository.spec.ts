import IUser from '../../domain/entities/interfaces/IUser'
import ILoadUserByEmailRepository from './interfaces/ILoadUserByEmailRepository'
import db from './../../database/models'
import { Model } from 'sequelize'

const { User } = db
class LoadUserByEmailRepository implements ILoadUserByEmailRepository {
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

const makeSut = () => {
  const sut = new LoadUserByEmailRepository(User)
  return { sut }
}

describe('LoadUserByEmailRepository', () => {
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
    await User.create({ email, password: 'any_password' })

    const { sut } = makeSut()

    const user = await sut.load(email)

    expect(user.email).toBe(email)
    expect(user.id).toBeTruthy()
  })
})
