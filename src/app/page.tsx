'use client'

import Button from "@/components/Button";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
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
    selectClient,
    deleteClient,
    showTable,
    status
  } = useClients()

  return (
    <>
      <Header title={'CADASTRO DE USUÁRIOS'} />
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
            {status !== 'loading' ? (
                <Table clients={clients} selectClient={selectClient} deleteClient={deleteClient} />
              ) : (
                <TableSkeleton />
              )}
          </>
        ) : (
          <Form client={client} cancel={showTable} changeClient={saveClient} />
        )}
      </section>
    </>
  )
}
