'use client'

import Button from "@/components/Button";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Tabela from "@/components/Table";
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
    showTable
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
                color="purple"
              >
                + NOVO CLIENTE
              </Button>
            </div>
            <Tabela clients={clients} selectClient={selectClient} deleteClient={deleteClient} />
          </>
        ) : (
          <Form client={client} cancel={showTable} changeClient={saveClient} />
        )}
      </section>
    </>
  )
}
