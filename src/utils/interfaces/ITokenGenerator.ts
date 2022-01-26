export default interface ITokenGenerator {
  userId : number
  accessToken : string
  generate(userId : number) : Promise<string>
}
