import Client from "@/core/Client"
import Actions from "./Actions"

interface ITableProps {
  clients: Client[]
  selectClient?: (client: Client) => void
  deleteClient?: (client: Client) => void
}

export default function Table({ clients, selectClient, deleteClient }: ITableProps) {

  const showActions = deleteClient || selectClient

  function tableHeader() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {showActions && <th className="p-4">Ações</th>}
      </tr>
    )
  }

  function tableData() {
    return clients.map((client, index) => (
        <tr key={client.id} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}`}>
          <td className="text-left p-4 text-gray-950">{client.id}</td>
          <td className="text-left p-4 text-gray-950">{client.name}</td>
          <td className="text-left p-4 text-gray-950">{client.age}</td>
          {showActions && <Actions client={client} selectClient={selectClient} deleteClient={deleteClient} />}
        </tr>
      )
    )
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className="bg-gradient-to-r from-gray-950 to-gray-900 text-gray-100">
        {tableHeader()}
      </thead>
      <tbody>
        {tableData()}
      </tbody>
    </table>
  )
}