import IEmailValidator from './interfaces/IEmailValidator'

import validator from 'validator'

export default class EmailValidator implements IEmailValidator {
  email: string;
  isEmailValid: boolean;

  isValid (email: string): boolean {
    this.email = email
    this.isEmailValid = validator.isEmail(this.email)
    return this.isEmailValid
  }
}
