'use client'

import Cliente from "@/core/Cliente"
import { IconeEditar, IconeLixo } from "./Icones"

interface IAcoesProps {
  cliente: Cliente
  clienteSelecionado?: (cliente: Cliente) => void
  clienteExcluido?: (cliente: Cliente) => void
}

export default function Acoes({ cliente, clienteSelecionado, clienteExcluido }: IAcoesProps) {
  return (
    <td className="flex justify-center">
      {clienteSelecionado && 
        <button onClick={() => clienteSelecionado?.(cliente)} className="flex justify-center item-center text-green-800 rounded-full hover:bg-purple-50 p-2 m-1">
          {IconeEditar}
        </button>
      }
      {clienteExcluido && 
        <button onClick={() => clienteExcluido?.(cliente)} className="flex justify-center item-center text-red-800 rounded-full hover:bg-purple-50 p-2 m-1">
          {IconeLixo}
        </button>
      }
    </td>
  )
}
