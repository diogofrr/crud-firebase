'use client'

import Client from "@/core/Client"
import { EditIcon, TrashIcon } from "./Icons"

interface IActionProps {
  client: Client
  editClient?: (client: Client) => void
  handleOpenDeleteModal?: () => void
}

export default function Actions({ client, editClient, handleOpenDeleteModal }: IActionProps) {
  return (
    <td className="flex justify-center">
      {editClient && 
        <button onClick={() => editClient?.(client)} className="flex justify-center item-center text-green-800 rounded-full hover:bg-purple-50 p-2 m-1">
          <EditIcon className="w-6 h-6" />
        </button>
      }
      <button 
        onClick={handleOpenDeleteModal}
        className="flex justify-center item-center text-red-800 rounded-full hover:bg-purple-50 p-2 m-1"
      >
        <TrashIcon className="w-6 h-6" />
      </button>
    </td>
  )
}