'use client'

interface IBotaoProps {
  children: any
  cor?: 'gray' | 'purple' | 'green'
  className?: string
  onClick: () => void
  tipo?: 'button' | 'submit' | 'reset'
}

const coresVariantes = {
  purple: 'bg-purple-600 hover:bg-purple-800 text-purple-100',
  gray: 'bg-gray-600 hover:bg-gray-700 text-gray-100',
  green: 'bg-green-600 hover:bg-green-700 text-green-100'
}

export default function Botao({ children, cor = 'purple', className, onClick, tipo = 'button' }: IBotaoProps) {
  return (
    <button type={tipo} onClick={onClick} className={`font-semibold px-4 py-2 rounded-md ${coresVariantes[cor]} ${className}`}>
      {children}
    </button>
  )
}