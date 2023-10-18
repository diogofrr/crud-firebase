import User from "./User"

export default interface IUserRepo {
  create(user: User): Promise<User>
  update(User: User): Promise<User>
  getUserInformation(): Promise<User>
}