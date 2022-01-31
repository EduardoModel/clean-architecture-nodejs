export default {
  token: 'any_token',
  value: '',
  secret: '',
  async sign (value, secret) : Promise<string> {
    this.value = value
    this.secret = secret
    return this.token
  }
}
