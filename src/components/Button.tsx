'use client'

interface IButtonProps {
  children: any
  color?: 'gray' | 'purple' | 'green' | 'red'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const buttonColors = {
  purple: 'bg-purple-600 hover:bg-purple-800 text-purple-100',
  gray: 'bg-gray-600 hover:bg-gray-700 text-gray-100',
  green: 'bg-green-600 hover:bg-green-700 text-green-100',
  red: 'bg-red-600 hover:bg-red-700 text-red-100'
}

export default function Button({ children, color = 'purple', className, onClick, type = 'button' }: IButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`font-semibold px-4 py-2 rounded-md ${buttonColors[color]} ${className}`}>
      {children}
    </button>
  )
}