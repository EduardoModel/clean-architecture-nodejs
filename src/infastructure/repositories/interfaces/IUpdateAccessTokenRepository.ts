import { Model } from 'sequelize'

export default interface IUpdateAccessTokenRepository {
  userId: number
  accessToken: string
  wasSuccessful: boolean
  userModel: Model
  update(userId : number, accessToken : string) : Promise<boolean>
}
