import User from "@/core/User";
import IUserRepo from "@/core/UserRepo";
import { firestore } from "../config";
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
        
        if (session.email && user.email !== session.email) {
          user.email = session.email;
          this.update(user)
        }

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

  async savePicture(file: Blob) {
    const storage = getStorage();
    const auth = getAuth();
    const session = auth.currentUser;

    const storageRef = ref(storage, `${session?.uid}`);
    const url = uploadBytes(storageRef, file)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!');
    })
    .then(async () => {
      const url = await getDownloadURL(storageRef);
      return url;
    })
    .catch((err) => {
      console.error(err);
      return null;
    })

    return url
  }
}
