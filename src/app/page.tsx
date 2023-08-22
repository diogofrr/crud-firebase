'use client'

import Button from "@/components/Button";
import Form from "@/components/Form";
import Header from "@/components/Header";
import SnackBar from "@/components/SnackBar";
import Table from "@/components/Table";
import TableSkeleton from "@/components/TableSkeleton";
import { useCallback, useContext, useState } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";
import useClients from "@/hooks/useClients";
import SideMenu from "@/components/SideMenu";
import { PlusIcon } from "@/components/Icons";
import TotalClients from "@/components/TotalClients";
import Birthdays from "@/components/Birthdays";
import Calendar from "@/components/Calendar";

export default function Home() {
  const {
    client,
    clients,
    tableIsVisible,
    saveClient,
    newClient,
    editClient,
    deleteClient,
    showTable
  } = useClients()

  const [menuOpen, setMenuOpen] = useState(window.screen.width > 1366)

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false)
  }, []) 

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true)
  }, [])

  const context = useContext(StatusContext)

  if (context === null) return <div className="bg-pink-700">Carregando...</div>

  const { closeSnackBar, state: { status, snackbarOpen, message } } = context

  return (
    <section className={`bg-titanWhite flex min-h-screen w-auto ${menuOpen && "overflow-hidden"}`}>
      <SideMenu menuOpen={menuOpen} handleCloseMenu={handleCloseMenu} />
      <section className={`w-full ${menuOpen ? "pl-72 pr-4" : "px-4"}`}>
        <Header menuOpen={menuOpen} handleOpenMenu={handleOpenMenu} />
        <main className="flex flex-col my-8">
          <section className={`p-4 bg-white overflow-auto rounded-xl shadow-xl w-full mb-4`}>
            <div className="mb-2">
              <Button color="hippieGreen">
                <PlusIcon width="w-5" height="h-5" className="mr-1 text-white stroke-2" />
                CADASTRAR NOVO USUÁRIO
              </Button>
            </div>
            <Table clients={clients} deleteClient={deleteClient} editClient={editClient}  />
          </section>
          {/* <section>
            <TotalClients clientsLength={clients.length} />
            <Birthdays clients={clients} status={status} />
            <Calendar clients={clients} />
          </section> */}
        </main>
      </section>
    </section>
  )
}
