import User from "./User";
import { User as UserAuth } from "firebase/auth";

export default interface IUserRepo {
  create(user: User): Promise<User>;
  update(User: User): Promise<User>;
  getUserInformation(): Promise<{ session: UserAuth; user: User }>;
}
