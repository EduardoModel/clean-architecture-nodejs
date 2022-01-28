import ITokenGenerator from './interfaces/ITokenGenerator'

class TokenGenerator implements ITokenGenerator {
  id: number
  token: string
  async generate (id: number): Promise<string> {
    return null
  }
}

const makeSut = () => {
  const sut = new TokenGenerator()
  return { sut }
}

describe('TokenGenerator', () => {
  test('it should return null if jwt returns null', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.generate(1)

    expect(accessToken).toBeNull()
  })
})
