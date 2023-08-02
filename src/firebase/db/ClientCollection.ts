import Client from "@/core/Client";
import IClientRepo from "@/core/ClientRepo";
import firestore from "../config";
import { QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

export default class ClientCollection implements IClientRepo {

  #conversor = {
    toFirestore({ name, age }: Client) {
      return {
        name,
        age
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: any) {
      const { name, age } = snapshot.data(options);
      return new Client(name, age, snapshot.id);
    }
  };
  
  private clientCollection() {
    return collection(firestore, "clientes").withConverter(this.#conversor);
  }


  async save(client: Client) {
    if (client.id) {
      await setDoc(doc(this.clientCollection(), client.id), client);
      return client
    } else {
      const clienteRef = await addDoc(this.clientCollection(), client);
      return new Client(client.name, client.age, clienteRef.id);
    }
  }

  async delete(client: Client) {
    await deleteDoc(doc(this.clientCollection(), client.id));
  }

  async getAll() {
    const querySnapshot = await getDocs(this.clientCollection());
    return querySnapshot.docs.map(doc => doc.data());
  }

}
