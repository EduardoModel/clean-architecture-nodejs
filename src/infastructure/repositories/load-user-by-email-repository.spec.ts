import IUser from '../../domain/entities/interfaces/IUser'
import ILoadUserByEmailRepository from './interfaces/ILoadUserByEmailRepository'

class LoadUserByEmailRepository implements ILoadUserByEmailRepository {
  email: string
  user: IUser
  async load (email: string): Promise<IUser> {
    return null
  }
}

const makeSut = () => {
  const sut = new LoadUserByEmailRepository()
  return { sut }
}

describe('LoadUserByEmailRepository', () => {
  test('it should return null if no user was found on the database', async () => {
    const { sut } = makeSut()

    const user = await sut.load('any_email')
    expect(user).toBeNull()
  })
})
