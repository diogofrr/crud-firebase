import Client from "@/core/Client"
import Actions from "./Actions"
import useModal from "@/hooks/useModal"
import DeleteModal from "./DeleteModal"
import { useContext, useState } from "react"
import { StatusContext } from "@/contexts/Status/StatusContext"

interface ITableProps {
  clients: Client[]
  editClient?: (client: Client) => void
  deleteClient?: (client: Client) => void
}

export default function Table({ clients, editClient, deleteClient }: ITableProps) {
  const showActions = deleteClient || editClient
  const [client, setClient] = useState<Client>(Client.empty())
  const { handleCloseModal, handleOpenModal, openModal } = useModal()

  const context = useContext(StatusContext)

  if (context === null) return null

  const { startLoading, stopLoading } = context

  function handleOpenDeleteModal(client: Client) {
    handleOpenModal()
    setClient(client)
  }

  function handleCloseDeleteModal() {
    handleCloseModal()
    setClient(Client.empty())
  }

  function handleDeleteClient() {
    startLoading('Excluindo cliente...')
    deleteClient?.(client)
  }

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
          {showActions && <Actions client={client} editClient={editClient} handleOpenDeleteModal={() => handleOpenDeleteModal(client)} />}
        </tr>
      )
    )
  }

  return (
    <>
      <DeleteModal open={openModal} handleCloseModal={handleCloseDeleteModal} deleteClient={handleDeleteClient} />
      <div className="overflow-auto max-h-[80vh] h-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-950 to-gray-900 text-gray-100">
            {tableHeader()}
          </thead>
          <tbody>
            {tableData()}
          </tbody>
        </table>
      </div>
    </>
  )
}