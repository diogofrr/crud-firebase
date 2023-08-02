import Cliente from "./Client"

export default interface IClientRepo {
  save(client: Cliente): Promise<Cliente>
  delete(client: Cliente): Promise<void>
  getAll(): Promise<Cliente[]>
}