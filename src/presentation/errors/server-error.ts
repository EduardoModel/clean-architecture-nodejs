export default class ServerError extends Error {
  constructor () {
    super('An internal error has occurred')
    this.name = 'ServerError'
  }
}
