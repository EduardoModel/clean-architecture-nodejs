export default interface ITokenGenerator {
  id : number
  token : string
  generate(id : number) : Promise<string>
}
