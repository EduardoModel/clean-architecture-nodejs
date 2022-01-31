import ITokenGenerator from './interfaces/ITokenGenerator'
import jwt from 'jsonwebtoken'
import MissingParamError from './errors/missing-param-error'

export default class TokenGenerator implements ITokenGenerator {
  id: number
  token: string
  secret: string
  constructor (secret : string) {
    this.secret = secret
  }

  async generate (id: number) : Promise<string> {
    if (!this.secret) {
      throw new MissingParamError('secret')
    }
    if (!id) {
      throw new MissingParamError('id')
    }
    this.id = id
    this.token = await jwt.sign({ id }, this.secret)
    return this.token
  }
}
