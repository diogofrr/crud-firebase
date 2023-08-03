import Button from "./Button";
import { ErrorIcon } from "./Icons";
import Modal from "./Modal";

interface IDeleteModalProps {
  open: boolean
  deleteClient: () => void
  handleCloseModal: () => void
}

export default function DeleteModal({ deleteClient, handleCloseModal, open }: IDeleteModalProps) {

  function handleDeleteClient() {
    deleteClient()
    handleCloseModal()
  }

  return (
    <Modal size={'w-2/6 h-2/6'} open={open}>
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