export default interface IUpdateAccessTokenRepository {
  userId: number
  accessToken: string
  wasSuccessful: boolean
  update(userId : number, accessToken : string) : Promise<boolean>
}
