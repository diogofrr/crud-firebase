'use client'

import Loading from "@/components/Loading"
import { AUTHENTICATED } from "@/constants/constants"
import { StatusContext } from "@/contexts/Status/StatusContext"
import useSession from "@/hooks/useSession"
import { useRouter } from "next/navigation"
import { useContext, useLayoutEffect } from "react"

interface IDashboardLayoutProps {
    children: JSX.Element
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
    const router = useRouter()
    const session = useSession()
    const status = useContext(StatusContext)

    useLayoutEffect(() => {
        status.resetStatus()
        if (session.profileData?.status !== AUTHENTICATED) {
            return router.push('/auth/login')
        }
    }, [session.profileData?.status])
    
    if (session.profileData?.status !== AUTHENTICATED) {
        return <Loading />
    }

    return <>{children}</>
}