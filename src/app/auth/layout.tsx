"use client";

import Loading from "@/components/Loading";
import { AUTHENTICATED, UNAUTHENTICATED } from "@/constants/constants";
import { StatusContext } from "@/contexts/Status/StatusContext";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

interface IAuthLayoutProps {
  children: JSX.Element;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  const router = useRouter();
  const session = useSession();
  const status = useContext(StatusContext)

  useLayoutEffect(() => {
    status.resetStatus()
    if (session.profileData?.status === AUTHENTICATED) {
      router.push("/");
    }
  }, [session.profileData?.status]);

  if (session.profileData?.status !== UNAUTHENTICATED) {
    return <Loading />;
  }

  return <>{children}</>;
}
