import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import firestore from "../config";
import { QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

export default class ColecaoCliente implements ClienteRepositorio {

  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: any) {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    }
  };
  
  private colecao() {
    return collection(firestore, "clientes").withConverter(this.#conversor);
  }


  async salvar(cliente: Cliente) {
    if (cliente.id) {
      await setDoc(doc(this.colecao(), cliente.id), cliente);
      return cliente
    } else {
      const clienteRef = await addDoc(this.colecao(), cliente);
      return new Cliente(cliente.nome, cliente.idade, clienteRef.id);
    }
  }

  async excluir(cliente: Cliente) {
    await deleteDoc(doc(this.colecao(), cliente.id));
  }

  async obterTodos() {
    const querySnapshot = await getDocs(this.colecao());
    return querySnapshot.docs.map(doc => doc.data());
  }

}
