import MissingParamError from '../routers/helpers/missing-param-error'
import ServerError from '../routers/helpers/server-error'
import UnauthorizedError from '../routers/helpers/unauthorized-error'

export default interface IHttpBody {
  email?: string
  password?: string
  accessToken?: string
  error?: MissingParamError | UnauthorizedError | ServerError
}
