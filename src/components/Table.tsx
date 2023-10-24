import Client from "@/core/Client";
import Actions from "./Actions";
import useModal from "@/hooks/useModal";
import DeleteModal from "./DeleteModal";
import { useContext, useState } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";
import { formatDateToDDMMYYYY, timestampToDate } from "@/utils/formatDate";
import { InboxIcon } from "./Icons";

interface ITableProps {
  clients: Client[];
  editClient?: (client: Client) => void;
  deleteClient?: (client: Client) => void;
}

export default function Table({
  clients,
  editClient,
  deleteClient,
}: ITableProps) {
  const showActions = deleteClient || editClient;
  const [client, setClient] = useState<Client>(Client.empty());
  const { handleCloseModal, handleOpenModal, openModal } = useModal();

  const context = useContext(StatusContext);

  if (context === null) return null;

  const { startLoading } = context;

  function handleOpenDeleteModal(client: Client) {
    handleOpenModal();
    setClient(client);
  }

  function handleCloseDeleteModal() {
    handleCloseModal();
    setClient(Client.empty());
  }

  function handleDeleteClient() {
    startLoading("Excluindo cliente...");
    deleteClient?.(client);
  }

  function tableHeader() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Data de Nascimento</th>
        <th className="text-left p-4">Telefone</th>
        <th className="text-left p-4">Email</th>
        {showActions && <th className="p-4">Ações</th>}
      </tr>
    );
  }

  function tableData() {
    return clients.map((client) => {
      const birthday = formatDateToDDMMYYYY(timestampToDate(client.birthday));

      return (
        <tr key={client.id} className={"bg-white"}>
          <td className="text-left p-4 text-tuna">{client.id}</td>
          <td className="text-left p-4 text-tuna">{client.name}</td>
          <td className="text-left p-4 text-tuna">{birthday}</td>
          <td className="text-left p-4 text-tuna">{client.tel}</td>
          <td className="text-left p-4 text-tuna">{client.email}</td>
          {showActions && (
            <Actions
              client={client}
              editClient={editClient}
              handleOpenDeleteModal={() => handleOpenDeleteModal(client)}
            />
          )}
        </tr>
      );
    });
  }

  return (
    <>
      <DeleteModal
        open={openModal}
        handleCloseModal={handleCloseDeleteModal}
        deleteClient={handleDeleteClient}
      />
      <div
        className={`overflow-auto h-[70vh] min-w-[1280px]  ${
          clients.length === 0 && "flex items-center justify-center"
        }`}
      >
        {clients.length > 0 ? (
          <table className="rounded-t-2xl overflow-hidden w-full">
            <thead className="text-white bg-chetwodeBlue rounded-t-2xl">
              {tableHeader()}
            </thead>
            <tbody>{tableData()}</tbody>
          </table>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <InboxIcon width="w-12" height="h-12" className="text-gray-400" />
            <p className="text-gray-400 text-center text-xl">
              Ainda não há registros
            </p>
          </div>
        )}
      </div>
    </>
  );
}
