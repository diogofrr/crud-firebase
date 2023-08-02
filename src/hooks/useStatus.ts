import { STATUS } from "@/types/global";
import { useState } from "react";

export default function useStatus() {
  const [status, setStatus] = useState<STATUS>('loading')
  const [message, setMessage] = useState<string>('')

  function startLoading(message: string) {
    setStatus('loading')
    setMessage(message)
  }

  function stopLoading(status: STATUS, message: string) {
    setStatus(status)
    setMessage(message)
  }

  return {
    startLoading,
    stopLoading,
    status,
    message
  }
}