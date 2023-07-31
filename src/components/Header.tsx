interface IHeaderProps {
  titulo: string
}

export default function Header({ titulo }: IHeaderProps) {
  return (
    <header>
      <h1 className="py-4 px-8 text-3xl font-medium text-slate-950">{titulo}</h1>
      <hr className="border-2 border-gray-500"/>
    </header>
  )
}