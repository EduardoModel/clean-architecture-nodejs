import IUser from '../../../domain/entities/interfaces/IUser'
export default interface ILoadUserByEmailRepository {
  email : string
  user: IUser
  load(email : string) : Promise<IUser>
}
