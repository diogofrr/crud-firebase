interface ITotalClientsProps {
  clientsLength: number
}

export default function TotalClients({ clientsLength }: ITotalClientsProps) {
  return (
    <div className="bg-white w-full md:w-56 h-48 shadow-xl rounded-2xl flex flex-col items-center justify-center gap-y-4 mb-4">
      <p className="text-tuna font-medium text-lg">Total de Registros</p>
      <p className="text-tuna text-7xl">{clientsLength}</p>
    </div>
  )
}