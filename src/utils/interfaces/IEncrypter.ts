export default interface IEncrypter {
  password: string
  hashedPassword : string
  isPasswordValid : boolean
  compare(password : string, hashedPassword : string) : Promise<boolean>
}
