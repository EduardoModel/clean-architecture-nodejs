import IEmailValidator from './interfaces/IEmailValidator'

import validator from 'validator'
import MissingParamError from './errors/missing-param-error'

export default class EmailValidator implements IEmailValidator {
  email: string
  isEmailValid: boolean

  isValid (email: string): boolean | Error {
    if (!email) {
      throw new MissingParamError('email')
    }
    this.email = email
    this.isEmailValid = validator.isEmail(this.email)
    return this.isEmailValid
  }
}
