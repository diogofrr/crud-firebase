import Client from "@/core/Client"
import IClientRepo from "@/core/ClientRepo"
import ClientCollection from "@/firebase/db/ClientCollection"
import { useState, useEffect, useContext } from "react"
import useVisibility from "./useVisibility"
import { Context as StatusContext } from "@/contexts/Status/StatusContext"

export default function useClients() {
  const repo: IClientRepo = new ClientCollection()

  const { tableIsVisible, showForm, showTable } = useVisibility()

  const [client, setClient] = useState<Client>(Client.empty())
  const [clients, setClients] = useState<Client[]>([])

  const context = useContext(StatusContext)

  useEffect(() => {
    context?.startLoading('')
    updateClients()
    setTimeout(() => {
      context?.stopLoading({
        status: 'success',
        message: ''
      })
    }, 1000)
  }, [])

  function updateClients() {
    repo.getAll().then(clients => {
      showTable()
      setClients(clients)
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
    await repo.delete(client)
      .then(() => context?.stopLoading({
        status: 'success',
        message: 'Cliente excluído com sucesso!!'
      }))
      .catch(() => context?.stopLoading({
        status: 'error',
        message: 'Falha ao excluir cliente.' 
      }))
    updateClients()
  }

  async function saveClient(client: Client) {
    await repo.save(client)
      .then(() => context?.stopLoading({
        status: 'success',
        message: 'Cliente salvo com sucesso!!'
      }))
      .catch(() => context?.stopLoading({ 
        status: 'error',
        message: 'Falha ao salvar cliente.'
      }))
    updateClients()
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
    updateClients
  }
}