"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import SideMenu from "@/components/SideMenu";
import SnackBar from "@/components/SnackBar";
import { AUTHENTICATED, UNAUTHENTICATED } from "@/constants/constants";
import { StatusContext } from "@/contexts/Status/StatusContext";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useLayoutEffect, useState } from "react";

interface IDashboardLayoutProps {
  children: JSX.Element;
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
  const router = useRouter();
  const session = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const context = useContext(StatusContext);

  const {
    closeSnackBar,
    state: { status, snackbarOpen, message },
  } = context;

  useLayoutEffect(() => {
    if (session.profileData?.status === UNAUTHENTICATED) {
      return router.push("/auth/login");
    }
  }, [session.profileData?.status]);

  if (session.profileData?.status !== AUTHENTICATED) {
    return <Loading />;
  }

  return (
    <>
      <SnackBar
        closeSnackBar={closeSnackBar}
        open={snackbarOpen}
        message={message}
        type={status}
      />
      <section
        className={`bg-titanWhite flex min-h-screen w-auto ${
          menuOpen && "overflow-hidden"
        }`}
      >
        <SideMenu menuOpen={menuOpen} handleCloseMenu={handleCloseMenu} />
        <section className={`w-full ${menuOpen ? "pl-72 pr-4" : "px-4"}`}>
          <Header menuOpen={menuOpen} handleOpenMenu={handleOpenMenu} />
          <main className="flex flex-col my-8">
            {children}
          </main>
        </section>
      </section>
    </>
  );
}
