import User from "@/core/User";
import IUserRepo from "@/core/UserRepo";
import { firestore } from "../config";
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default class UserCollection implements IUserRepo {
  #converter = {
    toFirestore({ name, profilePicture, email }: User) {
      return {
        name,
        profilePicture,
        email,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
      const { name, profilePicture, email } = snapshot.data(options);
      return new User(name, profilePicture, email, snapshot.id);
    },
  };

  private userCollection() {
    return collection(firestore, "users").withConverter(this.#converter);
  }

  async create(user: User) {
    const auth = getAuth();
    const userAuth = auth.currentUser;

    if (userAuth) {
      user.uid = userAuth.uid;

      await setDoc(doc(this.userCollection(), user.uid), user);
      return new User(user.name, user.profilePicture, user.email);
    } else {
      throw new Error("Usuário não autenticado");
    }
  }

  async update(user: User) {
    await setDoc(doc(this.userCollection(), user.uid), user);
    return user;
  }

  async getUserInformation() {
    const auth = getAuth();
    const session = auth.currentUser;

    if (session) {
      const userSnapshot = await getDoc(
        doc(this.userCollection(), session.uid)
      );

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const user = new User(
          userData.name,
          userData.profilePicture,
          userData.email,
          session.uid
        );
        return {
          session,
          user,
        };
      } else {
        throw new Error("Dados do usuário não encontrados no Firestore");
      }
    } else {
      throw new Error("Usuário não autenticado");
    }
  }
}
