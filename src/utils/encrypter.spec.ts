import IEncrypter from './interfaces/IEncrypter'

class Encrypter implements IEncrypter {
  password: string
  hashedPassword: string
  isPasswordValid: boolean

  compare (password: string, hashedPassword: string): Promise<boolean> {
    this.password = password
    this.hashedPassword = hashedPassword

    return new Promise((resolve) => resolve(this.isPasswordValid))
  }
}

const makeSut = () => {
  const sut = new Encrypter()
  sut.isPasswordValid = true

  return { sut }
}

describe('Encrypter', () => {
  test('it should return true if bcrypt returns true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })
})
