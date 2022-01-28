export default interface IEmailValidator {
  email: string
  isEmailValid: boolean
  isValid(email: string) : boolean | Error
}
