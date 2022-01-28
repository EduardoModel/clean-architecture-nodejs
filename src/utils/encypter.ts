import IEncrypter from './interfaces/IEncrypter'
import bcrypt from 'bcryptjs'
import MissingParamError from './errors/missing-param-error'

export default class Encrypter implements IEncrypter {
  string: string
  hash: string
  isHashValid: boolean

  async compare (string: string, hash: string): Promise<boolean> {
    if (!string) {
      throw new MissingParamError('string')
    }
    if (!hash) {
      throw new MissingParamError('hash')
    }
    this.string = string
    this.hash = hash
    this.isHashValid = await bcrypt.compare(this.string, this.hash)
    return this.isHashValid
  }
}
