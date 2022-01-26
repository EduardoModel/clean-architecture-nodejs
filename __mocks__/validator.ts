export default {
  email: '',
  isEmailValid: true,
  isEmail (email : string) :boolean {
    this.email = email
    return this.isEmailValid
  }
}
