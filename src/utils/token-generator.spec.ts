import jwt from 'jsonwebtoken'
import MissingParamError from './errors/missing-param-error'
import TokenGenerator from './token-generator'

const makeSut = () => {
  const secret = 'any_secret'
  const sut = new TokenGenerator(secret)
  return { sut, secret }
}

describe('TokenGenerator', () => {
  test('it should return null if jwt returns null', async () => {
    const { sut } = makeSut()
    jwt.token = null

    const accessToken = await sut.generate(1)

    expect(accessToken).toBeNull()
  })

  test('it should return a token if jwt returns token', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.generate(1)

    expect(accessToken).toBe(jwt.token)
  })

  test('it should call jwt with correct params', async () => {
    const { sut } = makeSut()

    await sut.generate(1)

    expect(jwt.value).toStrictEqual({ id: 1 })
    expect(jwt.secret).toBe(sut.secret)
  })

  test('it should throw if a secret is not provided', async () => {
    const sut = new TokenGenerator()

    const promise = sut.generate(1)

    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })

  test('it should throw if an id is not provided', async () => {
    const { sut } = makeSut()

    const promise = sut.generate()

    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
