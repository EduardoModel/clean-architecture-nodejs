import ITokenGenerator from './interfaces/ITokenGenerator'
import jwt from 'jsonwebtoken'

class TokenGenerator implements ITokenGenerator {
  id: number
  token: string
  async generate (id: number) : Promise<string> {
    this.token = await jwt.sign({ id }, 'secret')
    return this.token
  }
}

const makeSut = () => {
  const sut = new TokenGenerator()
  return { sut }
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
    expect(jwt.secret).toBe('secret')
  })
})
