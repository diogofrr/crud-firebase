import { STATUS } from "@/types/global";
import { useState } from "react";

export default function useStatus() {
  const [status, setStatus] = useState<STATUS>('')
  const [message, setMessage] = useState<string>('')
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
      setStatus('')
      setMessage('')
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