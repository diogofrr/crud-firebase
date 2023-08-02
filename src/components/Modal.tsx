import { ReactNode } from "react"

interface IModalProps {
  children: ReactNode
}

export default function Modal({ children }: IModalProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
        {children}
      </div>
    </div>
  )
}