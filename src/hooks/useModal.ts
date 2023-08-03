import { useState } from "react"

export default function useModal() {
  const [openModal, setOpenModal] = useState(false)

  function handleOpenModal() {
    setOpenModal(true)
  }

  function handleCloseModal() {
    setOpenModal(false)
  }

  return {
    handleOpenModal,
    handleCloseModal,
    openModal
  }
}