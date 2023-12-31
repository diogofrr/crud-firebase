import Client from "@/core/Client";
import IClientRepo from "@/core/ClientRepo";
import { firestore } from "../config";
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default class ClientCollection implements IClientRepo {
  #converter = {
    toFirestore({ name, birthday, email, tel, uid }: Client) {
      return {
        name,
        birthday,
        email,
        tel,
        uid,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
      const { name, birthday, email, tel } = snapshot.data(options);
      return new Client(name, birthday, tel, email, snapshot.id);
    },
  };

  private clientCollection() {
    return collection(firestore, "clients").withConverter(this.#converter);
  }

  async save(client: Client) {
    const auth = getAuth();
    const session = auth.currentUser;

    if (session) {
      client.uid = session.uid

      if (client.id) {
        await setDoc(doc(this.clientCollection(), client.id), client);
        return client;
      } else {
        const clienteRef = await addDoc(this.clientCollection(), client);
        return new Client(
          client.name,
          client.birthday,
          client.tel,
          client.email,
          clienteRef.id
        );
      }
    } else {
      throw new Error("Usuário não autenticado");
    }
  }

  async delete(client: Client) {
    await deleteDoc(doc(this.clientCollection(), client.id));
  }

  async getAll() {
    const querySnapshot = await getDocs(this.clientCollection());
    return querySnapshot.docs.map((doc) => doc.data());
  }
}
