import Client from "@/core/Client"
import IClientRepo from "@/core/ClientRepo"
import ClientCollection from "@/firebase/db/ClientCollection"
import { useState, useEffect } from "react"
import useVisibility from "./useVisibility"
import useStatus from "./useStatus"

export default function useClients() {
  const repo: IClientRepo = new ClientCollection()

  const [client, setClient] = useState<Client>(Client.empty())
  const [clients, setClients] = useState<Client[]>([])
  const { tableIsVisible, showForm, showTable } = useVisibility()
  const { startLoading, stopLoading, status, message, openSnackBar, closeSnackBar } = useStatus()

  useEffect(() => getAll(), [])

  function getAll() {
    repo.getAll().then(clients => {
      setClients(clients)
      showTable()
    })
  }

  function newClient() {
    setClient(Client.empty())
    showForm()
  }

  function editClient(client: Client) {
    setClient(client)
    showForm()
  }

  async function deleteClient(client: Client) {
    startLoading('Excluindo conteúdo...')
    await repo.delete(client)
      .then(() => stopLoading('success', 'Cliente excluído com sucesso!!'))
      .catch(() => stopLoading('error', 'Falha ao excluir cliente.'))
    getAll()
  }

  async function saveClient(client: Client) {
    startLoading('Salvando conteúdo...')
    await repo.save(client)
      .then(() => stopLoading('success', 'Cliente salvo com sucesso!!'))
      .catch(() => stopLoading('error', 'Falha ao salvar cliente.'))
    getAll()
  }

  return {
    client,
    clients,
    tableIsVisible,
    saveClient,
    newClient,
    editClient,
    deleteClient,
    showTable,
    status,
    message,
    openSnackBar,
    closeSnackBar
  }
}