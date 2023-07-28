import Cliente from "@/core/Cliente"
// import { IconeEditar, IconeLixo } from "./Icones"
import Acoes from "./Acoes"

interface ITabelaProps {
  clientes: Cliente[]
  clienteSelecionado?: (cliente: Cliente) => void
  clienteExcluido?: (cliente: Cliente) => void
}

export default function Tabela({ clientes, clienteSelecionado, clienteExcluido }: ITabelaProps) {

  const exibirAcoes = clienteExcluido || clienteSelecionado

  function renderizarCabecalho() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {exibirAcoes && <th className="p-4">Ações</th>}
      </tr>
    )
  }

  function renderizarDados() {
    return clientes?.map((cliente, index) => {
      return (
        <tr key={cliente.id} className={`${index % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className="text-left p-4 text-gray-950">{cliente.id}</td>
          <td className="text-left p-4 text-gray-950">{cliente.nome}</td>
          <td className="text-left p-4 text-gray-950">{cliente.idade}</td>
          {exibirAcoes && <Acoes cliente={cliente} clienteSelecionado={clienteSelecionado} clienteExcluido={clienteExcluido} />}
        </tr>
      )
    })
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className="bg-gradient-to-r from-purple-950 to-purple-900 text-gray-100">
        {renderizarCabecalho()}
      </thead>
      <tbody>
        {renderizarDados()}
      </tbody>
    </table>
  )
}