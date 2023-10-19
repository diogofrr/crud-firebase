'use client'

import Loading from "@/components/Loading"
import { auth } from "@/firebase/config"
import { useRouter } from "next/navigation"
import { useLayoutEffect } from "react"

interface IAuthLayoutProps {
    children: JSX.Element
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
    const router = useRouter()

    useLayoutEffect(() => {
        if (auth.currentUser) {
            router.push('')
        }
    }, [router])
    
    if (auth.currentUser) {
        return <Loading />
    }

    return <>{children}</>
}