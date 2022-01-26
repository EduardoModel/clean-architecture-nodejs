import IHttpBody from './IHttpBody'

export default interface IHttpResponse {
  statusCode: number
  body?: IHttpBody
}
