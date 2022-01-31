export default interface ITokenGenerator {
  id : number
  token : string
  secret : string
  generate(id : number) : Promise<string>
}
