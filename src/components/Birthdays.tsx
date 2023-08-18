import Client from "@/core/Client"
import { STATUS } from "@/types/global"
import { formatDateToDDMMYYYY, timestampToDate } from "@/utils/formatDate"
import { useEffect, useState } from "react"

interface IBirthdaysProps {
  clients: Client[]
  status: STATUS
}

interface IItemProps {
  children: React.ReactNode
}

export default function Birthdays({ clients, status }: IBirthdaysProps) {
  const [filteredClients, setFilteredClients] = useState<Client[]>([])

  useEffect(() => {
    if (status !== 'loading') {
      const filter = clients.filter((client) => timestampToDate(client.birthday).getMonth() === new Date().getMonth())
      setFilteredClients(filter)
    }
  }, [clients, status])

  function Item({ children }: IItemProps) {
    return (
      <div className="bg-chetwodeBlue w-full mx-3 my-2 flex items-center justify-center text-center px-4 py-4 rounded-2xl">
        <p className="text-white text-sm">
          {children}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white overflow-y-auto overflow-x-hidden max-h-96 w-56 p-2 shadow-xl rounded-2xl mb-4 flex flex-col items-center">
      <p className="text-tuna font-medium text-lg mt-7 mb-4">&#127874; Aniversariantes ({filteredClients.length})</p>
      {filteredClients.map((client) => {
        let clientNameString
        const clientNameArray = client.name.split(' ')
        const clientBirthday = formatDateToDDMMYYYY(timestampToDate(client.birthday)).split('/')

        if (clientNameArray.length > 1) {
          clientNameString = `${clientNameArray[0]} ${clientNameArray[clientNameArray.length - 1][0]}.`
        } else {
          clientNameString = clientNameArray[0]
        }

        return (
          <Item key={client.id}>{`${clientNameString} - ${clientBirthday[0]}/${clientBirthday[1]}`}</Item>
        )
      })}
    </div>
  )
}