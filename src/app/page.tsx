'use client'

import Button from "@/components/Button";
import Form from "@/components/Form";
import Header from "@/components/Header";
import SnackBar from "@/components/SnackBar";
import Table from "@/components/Table";
import TableSkeleton from "@/components/TableSkeleton";
import { useContext } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";
import useClients from "@/hooks/useClients";

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

  const context = useContext(StatusContext)

  if (context === null) return <div className="bg-pink-700"> oi</div>

  const { closeSnackBar, state: { status, snackbarOpen, message } } = context

  return (
    <>
      <SnackBar open={snackbarOpen} message={message} type={status} closeSnackBar={closeSnackBar} />
      <Header />
      <section className="px-8 py-4">
        {tableIsVisible ? (
          <>
            {status === 'loading' ? (
              <TableSkeleton />
            ) : (
              <>
                <div className="flex justify-end">
                  <Button
                    onClick={newClient}
                    className="mb-4"
                    color="gray"
                  >
                    + NOVO CLIENTE
                  </Button>
                </div>
                <Table
                  clients={clients}
                  editClient={editClient}
                  deleteClient={deleteClient}
                />
              </>
            )}
          </>
        ) : (
          <Form
            client={client}
            cancel={showTable}
            saveClient={saveClient}
            status={status}
          />
        )}
      </section>
    </>
  )
}
