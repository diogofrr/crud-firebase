'use client'

import Loading from "@/components/Loading"
import { auth } from "@/firebase/config"
import { useRouter } from "next/navigation"
import { useLayoutEffect } from "react"

interface IDashboardLayoutProps {
    children: JSX.Element
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
    const router = useRouter()

    useLayoutEffect(() => {
        if (!auth.currentUser) {
            return router.push('/auth/login')
        }
    }, [router])
    
    if (!auth.currentUser) {
        return <Loading />
    }

    return <>{children}</>
}