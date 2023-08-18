'use client'

interface IButtonProps {
  children: any
  color?: 'gray' | 'hippieGreen' | 'red'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const buttonColors = {
  gray: 'bg-gray-200 hover:bg-gray-500 text-gray-700',
  hippieGreen: 'bg-hippieGreen-500 hover:bg-hippieGreen-700 text-white',
  red: 'bg-red-500 hover:bg-red-700 text-white'
}

export default function Button({ children, color = 'hippieGreen', className, onClick, type = 'button', disabled = false }: IButtonProps) {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={`font-semibold px-4 py-3 rounded-lg flex items-center justify-center ${buttonColors[color]} ${className}`}>
      {children}
    </button>
  )
}