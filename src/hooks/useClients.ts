import Cliente from "@/core/Client"
import IClientRepo from "@/core/ClientRepo"
import ClientCollection from "@/firebase/db/ClientCollection"
import { useState, useEffect } from "react"
import useVisibility from "./useVisibility"
import useStatus from "./useStatus"

export default function useClients() {
  const repo: IClientRepo = new ClientCollection()

  const [client, setClient] = useState<Cliente>(Cliente.empty())
  const [clients, setClients] = useState<Cliente[]>([])
  const { formIsVisible, tableIsVisible, showForm, showTable } = useVisibility()
  const { startLoading, stopLoading, status } = useStatus()

  useEffect(() => getAll(), [])

  function getAll() {
    startLoading('Carregando clientes')
    repo.getAll().then(clients => {
      setClients(clients)
      showTable()
    })
    stopLoading('success', 'Clientes buscados com sucesso!')
  }

  function newClient() {
    setClient(Cliente.empty())
    showForm()
  }

  function selectClient(cliente: Cliente) {
    setClient(cliente)
    showForm()
  }

  async function deleteClient(cliente: Cliente) {
    await repo.delete(cliente)
    getAll()
  }

  async function saveClient(cliente: Cliente) {
    await repo.save(cliente)
    getAll()
  }

  return {
    client,
    clients,
    tableIsVisible,
    saveClient,
    newClient,
    selectClient,
    deleteClient,
    showTable,
    status
  }
}