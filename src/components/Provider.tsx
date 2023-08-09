'use client'

import StatusProvider from "@/contexts/Status/StatusContext"

interface IProviderProps {
  children: React.ReactNode
}

export default function Provider({ children }: IProviderProps) {
  return (
    <StatusProvider>
      {children}
    </StatusProvider>
  )
}