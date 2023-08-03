import Client from "@/core/Client"
import Actions from "./Actions"
import useModal from "@/hooks/useModal"
import DeleteModal from "./DeleteModal"
import { useState } from "react"
import SnackBar from "./SnackBar"
import { STATUS } from "@/types/global"

interface ITableProps {
  clients: Client[]
  editClient?: (client: Client) => void
  deleteClient?: (client: Client) => void
  openSnackBar: boolean
  message: string
  status: STATUS
  closeSnackBar: () => void
}

export default function Table({ clients, editClient, deleteClient, openSnackBar, closeSnackBar, message, status }: ITableProps) {
  const showActions = deleteClient || editClient
  const [client, setClient] = useState<Client>(Client.empty())
  const { handleCloseModal, handleOpenModal, openModal } = useModal()

  function handleOpenDeleteModal(client: Client) {
    handleOpenModal()
    setClient(client)
  }

  function handleCloseDeleteModal() {
    handleCloseModal()
    setClient(Client.empty())
  }

  function handleDeleteClient() {
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
      <SnackBar open={openSnackBar} message={message} type={status} closeSnackBar={closeSnackBar} />
      <DeleteModal open={openModal} handleCloseModal={handleCloseDeleteModal} deleteClient={handleDeleteClient} />
      <table className="w-full rounded-xl overflow-hidden">
        <thead className="bg-gradient-to-r from-gray-950 to-gray-900 text-gray-100">
          {tableHeader()}
        </thead>
        <tbody>
          {tableData()}
        </tbody>
      </table>
    </>
  )
}