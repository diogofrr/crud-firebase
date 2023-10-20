'use client'

import Loading from "@/components/Loading"
import { AUTHENTICATED, UNAUTHENTICATED } from "@/constants/constants"
import useSession from "@/hooks/useSession"
import { useRouter } from "next/navigation"
import { useLayoutEffect } from "react"

interface IAuthLayoutProps {
    children: JSX.Element
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
    const router = useRouter()
    const session = useSession()

    useLayoutEffect(() => {
        if (session.profileData?.status === AUTHENTICATED) {
            router.push('/')
        }
    }, [router, session.profileData?.status])
    
    if (session.profileData?.status !== UNAUTHENTICATED) {
        return <Loading />
    }

    return <>{children}</>
}