'use client'

import Button from "@/components/Button";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Table from "@/components/Table";
import TableSkeleton from "@/components/TableSkeleton";
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
    showTable,
    status,
    message,
    openSnackBar,
    closeSnackBar
  } = useClients()

  return (
    <>
      <Header />
      <section className="px-8 py-4">
        {tableIsVisible ? (
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
              openSnackBar={openSnackBar}
              message={message}
              status={status}
              closeSnackBar={closeSnackBar}
              />
          </>
        ) : (
          <Form client={client} cancel={showTable} changeClient={saveClient} />
        )}
      </section>
    </>
  )
}
