import { useState } from "react"

export default function useModal() {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return {
    handleOpenModal,
    handleCloseModal,
    openModal
  }
}