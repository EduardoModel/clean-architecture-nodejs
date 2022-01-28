import IEncrypter from './interfaces/IEncrypter'
import bcrypt from 'bcryptjs'

export default class Encrypter implements IEncrypter {
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
