import Button from "./Button";
import Modal from "./Modal";
import { ErrorIcon } from "./Icons";

interface IUpdateEmailModalProps {
  action: () => void;
  open: boolean;
  handleCloseModal: () => void;
}

export default function UpdateEmailModal({ open, handleCloseModal, action }: IUpdateEmailModalProps) {
  return (
    <Modal size="w-[32rem] h-72" open={open}>
      <div className="flex justify-center items-center flex-col gap-4">
        <ErrorIcon width="w-24" height="h-24" />
        <p className="text-tuna text-xl">Tem certeza que deseja atualizar seu email?</p>
        <div className="flex gap-4">
          <Button color="hippieGreen" onClick={action}>
            Atualizar
          </Button>
          <Button color="gray" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}