import Encrypter from './encypter'
import bcrypt from 'bcryptjs'

const makeSut = () => {
  const sut = new Encrypter()
  sut.isHashValid = true

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
