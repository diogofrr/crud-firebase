'use client'

import Button from "@/components/Button";
import Form from "@/components/Form";
import Table from "@/components/Table";
import TableSkeleton from "@/components/TableSkeleton";
import useClients from "@/hooks/useClients";
import { LeftArrowIcon, PlusIcon } from "@/components/Icons";
import TotalClients from "@/components/TotalClients";
import Birthdays from "@/components/Birthdays";
import Calendar from "@/components/Calendar";
import { LOADING } from "@/constants/constants";
import { useContext } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";

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
  } = useClients();

  const context = useContext(StatusContext);

  const {
    state: { status },
  } = context;

  return (
    <>
      {tableIsVisible ? (
        status === LOADING ? (
          <TableSkeleton />
        ) : (
          <section
            className={`p-4 bg-white overflow-auto rounded-xl shadow-xl w-full mb-4`}
          >
            <div className="mb-2">
              <Button color="hippieGreen" onClick={newClient}>
                <PlusIcon
                  width="w-5"
                  height="h-5"
                  className="mr-1 text-white stroke-2"
                />
                CADASTRAR NOVO USUÁRIO
              </Button>
            </div>
            <Table
              clients={clients}
              deleteClient={deleteClient}
              editClient={editClient}
            />
          </section>
        )
      ) : (
        <section className="flex justify-center items-center gap-4 flex-wrap h-auto md:h-[800px]">
          <div
            className={`bg-white rounded-xl shadow-xl self-start p-8 flex-grow h-full`}
          >
            <div className="flex gap-4 pb-12">
              <button type="button" onClick={showTable}>
                <LeftArrowIcon
                  width="w-8"
                  height="w-8"
                  className="text-tuna stroke-2 cursor-pointer"
                />
              </button>
              <p className="text-3xl text-tuna font-medium">
                Novo Usuário
              </p>
            </div>
            <Form
              client={client}
              status={status}
              saveClient={saveClient}
            />
          </div>
          <div className="w-full md:w-auto h-full">
            <TotalClients clientsLength={clients.length} />
            <Birthdays clients={clients} status={status} />
            <Calendar clients={clients} />
          </div>
        </section>
      )}
    </>
  );
}
