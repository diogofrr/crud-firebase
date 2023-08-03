import { ReactNode } from "react"

interface IModalProps {
  children: ReactNode
  open: boolean
  size: string
}

export default function Modal({ children, open, size }: IModalProps) {
  return (
    <div className={`absolute ${!open && 'hidden'}`}>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-50 flex justify-center items-center">
        <div className={`${size} rounded-xl bg-white flex justify-center items-center`}>
          {children}
        </div>
      </div>
    </div>
  )
}