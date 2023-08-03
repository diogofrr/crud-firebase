import { STATUS } from "@/types/global";
import { useState } from "react";

export default function useStatus() {
  const [status, setStatus] = useState<STATUS>('loading')
  const [message, setMessage] = useState<string>('Carregando...')
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)

  function startLoading(message: string) {
    setStatus('loading')
    setMessage(message)
    setOpenSnackBar(true)
  }

  function stopLoading(status: STATUS, message: string) {
    setStatus(status)
    setMessage(message)
    setTimeout(() => {
      setOpenSnackBar(false)
      setStatus('loading')
      setMessage('Carregando...')
    }, 5000)
  }

  function closeSnackBar() {
    setOpenSnackBar(false)
  }

  return {
    startLoading,
    stopLoading,
    status,
    message,
    openSnackBar,
    closeSnackBar
  }
}