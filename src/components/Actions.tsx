'use client'

import Client from "@/core/Client"
import { EditIcon, TrashIcon } from "./Icons"
import useStatus from "@/hooks/useStatus"
import SnackBar from "./SnackBar"
import Modal from "./Modal"

interface IActionProps {
  client: Client
  selectClient?: (client: Client) => void
  deleteClient?: (client: Client) => void
}

export default function Actions({ client, selectClient, deleteClient }: IActionProps) {
  const { message, status, startLoading, stopLoading } = useStatus()

  return (
    <>
      {message !== '' && <SnackBar message={message} type={status} />}
      <td className="flex justify-center">
        {selectClient && 
          <button onClick={() => selectClient?.(client)} className="flex justify-center item-center text-green-800 rounded-full hover:bg-purple-50 p-2 m-1">
            {EditIcon}
          </button>
        }
        {deleteClient && 
          <button onClick={() => deleteClient?.(client)} className="flex justify-center item-center text-red-800 rounded-full hover:bg-purple-50 p-2 m-1">
            {TrashIcon}
          </button>
        }
      </td>
    </>
  )
}
