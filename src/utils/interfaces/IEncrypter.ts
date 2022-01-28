export default interface IEncrypter {
  string: string
  hash : string
  isHashValid : boolean
  compare(string : string, hash : string) : Promise<boolean>
}
