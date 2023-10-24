import Client from "@/core/Client";
import IClientRepo from "@/core/ClientRepo";
import ClientCollection from "@/firebase/db/ClientCollection";
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import useVisibility from "./useVisibility";
import { StatusContext } from "@/contexts/Status/StatusContext";
import { start } from "repl";

export default function useClients() {
  const repo: IClientRepo = useMemo(() => new ClientCollection(), []);

  const { tableIsVisible, showForm, showTable } = useVisibility();

  const [client, setClient] = useState<Client>(Client.empty());
  const [clients, setClients] = useState<Client[]>([]);

  const context = useContext(StatusContext);

  const updateClients = useCallback(() => {
    repo.getAll().then((clients) => {
      showTable();
      setClients(clients);
    });
  }, [repo, showTable]);

  useLayoutEffect(() => {
    context?.startLoading("");
    updateClients();
    context?.stopLoading({
      status: "success",
      message: "",
    });
  }, []);

  const newClient = useCallback(() => {
    setClient(Client.empty());
    showForm();
  }, [showForm]);

  const editClient = useCallback(
    (client: Client) => {
      setClient(client);
      showForm();
    },
    [showForm]
  );

  const deleteClient = useCallback(
    async (client: Client) => {
      await repo
        .delete(client)
        .then(() =>
          context?.stopLoading({
            status: "success",
            message: "Cliente excluído com sucesso!!",
          })
        )
        .catch(() =>
          context?.stopLoading({
            status: "error",
            message: "Falha ao excluir cliente.",
          })
        )
        .finally(() =>
          setTimeout(() => {
            context?.resetStatus();
          }, 2500)
        );
      updateClients();
    },
    [context, repo, updateClients]
  );

  const saveClient = useCallback(
    async (client: Client) => {
      await repo
        .save(client)
        .then(() =>
          context?.stopLoading({
            status: "success",
            message: "Cliente salvo com sucesso!!",
          })
        )
        .catch(() =>
          context?.stopLoading({
            status: "error",
            message: "Falha ao salvar cliente.",
          })
        )
        .finally(() =>
          setTimeout(() => {
            context?.resetStatus();
          }, 2500)
        );
      updateClients();
    },
    [context, repo, updateClients]
  );

  return {
    client,
    clients,
    tableIsVisible,
    saveClient,
    newClient,
    editClient,
    deleteClient,
    showTable,
    updateClients,
  };
}
