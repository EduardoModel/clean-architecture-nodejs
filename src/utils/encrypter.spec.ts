import IEncrypter from './interfaces/IEncrypter'
import bcrypt from 'bcryptjs'

class Encrypter implements IEncrypter {
  string: string
  hash: string
  isHashValid: boolean

  async compare (string: string, hash: string): Promise<boolean> {
    this.string = string
    this.hash = hash
    this.isHashValid = await bcrypt.compare(this.string, this.hash)
    return this.isHashValid
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
    const isValid = await sut.compare('any_string', 'hashed_string')
    expect(isValid).toBe(true)
  })

  test('it should return false if bcrypt returns false', async () => {
    const { sut } = makeSut()
    bcrypt.isHashValid = false
    const isValid = await sut.compare('any_string', 'hashed_string')
    expect(isValid).toBe(false)
  })

  test('it should call bcrypt with correct values', async () => {
    const { sut } = makeSut()
    await sut.compare('any_string', 'hashed_string')
    expect(bcrypt.s).toBe(sut.string)
    expect(bcrypt.hash).toBe(sut.hash)
  })
})
