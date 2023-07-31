import Cliente from "@/core/Cliente"
import IClienteRepositorio from "@/core/ClienteRepositorio"
import ColecaoCliente from "@/firebase/db/ColecaoCliente"
import { useState, useEffect } from "react"
import useVisibilidade from "./useVisibilidade"

export default function useClientes() {
  const repositorio: IClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const { tabelaVisivel, formularioVisivel, exibirFormulario, exibirTabela } = useVisibilidade()

  useEffect(() => obterTodos(), [])

  function obterTodos() {
    repositorio.obterTodos().then(clientes => {
      setClientes(clientes)
      exibirTabela()
    })
  }

  function novoCliente() {
    setCliente(Cliente.vazio())
    exibirFormulario()
  }

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente)
    exibirFormulario()
  }

  async function excluirCliente(cliente: Cliente) {
    await repositorio.excluir(cliente)
    obterTodos()
  }

  async function salvarCliente(cliente: Cliente) {
    await repositorio.salvar(cliente)
    obterTodos()
  }

  return {
    cliente,
    clientes,
    tabelaVisivel,
    salvarCliente,
    obterTodos,
    novoCliente,
    selecionarCliente,
    excluirCliente,
    exibirTabela
  }
}