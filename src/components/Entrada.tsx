'use client'

import { Dispatch, SetStateAction } from "react"

interface IEntradaProps {
  texto: string
  tipo: 'text' | 'number'
  valor: any
  somenteLeitura?: boolean
  valorMudou?: Dispatch<SetStateAction<any>>
}

export default function Entrada({ texto, tipo, valor, somenteLeitura = false, valorMudou }: IEntradaProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-black mb-2">{texto}</label>
      <input
        className={`
          text-black
          border-2 border-black rounded-md
          px-3 py-3
          focus:outline-none
          ${somenteLeitura ? '' : 'focus:bg-white'}
          bg-gray-50
        `}
        type={tipo}
        value={valor}
        readOnly={somenteLeitura}
        onChange={e => valorMudou?.(e.target.value)}
      />
    </div>
  )
}