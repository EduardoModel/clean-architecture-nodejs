import { Model } from 'sequelize'
import IUser from '../../../domain/entities/interfaces/IUser'
export default interface ILoadUserByEmailRepository {
  email : string
  user: IUser
  userModel: Model
  load(email : string) : Promise<IUser>
}
