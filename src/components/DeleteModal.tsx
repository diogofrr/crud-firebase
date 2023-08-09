import Button from "./Button";
import { ErrorIcon } from "./Icons";
import Modal from "./Modal";
import { useContext } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";

interface IDeleteModalProps {
  open: boolean
  deleteClient: () => void
  handleCloseModal: () => void
}

export default function DeleteModal({ deleteClient, handleCloseModal, open }: IDeleteModalProps) {

  const context = useContext(StatusContext)

  function handleDeleteClient() {
    context?.startLoading('Excluindo cliente...')
    deleteClient()
    handleCloseModal()
  }

  return (
    <Modal size={'w-[32rem] h-72'} open={open}>
      <div className="flex justify-center items-center flex-col gap-4">
        <ErrorIcon width="w-24" height="h-24" />
        <p className="text-black text-xl">Deseja excluir esse registro?</p>
        <div className="flex gap-4">
          <Button color="red" onClick={handleDeleteClient}>
            Excluir
          </Button>
          <Button color="gray" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}