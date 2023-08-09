'use client'

import StatusContext from '@/contexts/Status/StatusContext'
import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen justify-center items-center`} cz-shortcut-listen="false">
        <main className="h-full w-full bg-white">
          <StatusContext>
            {children}
          </StatusContext>
        </main>
      </body>
    </html>
  )
}
