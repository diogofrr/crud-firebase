import { ReactNode } from "react"

interface IModalProps {
  children: ReactNode
}

export default function Modal({ children }: IModalProps) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-50 flex justify-center items-center">
      <div className="w-2/6 h-2/6 rounded-xl bg-white flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}