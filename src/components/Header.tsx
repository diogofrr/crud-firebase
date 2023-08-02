interface IHeaderProps {
  title: string
}

export default function Header({ title }: IHeaderProps) {
  return (
    <header>
      <h1 className="py-4 px-8 text-3xl font-medium text-slate-950">{title}</h1>
      <hr className="border-2 border-gray-500"/>
    </header>
  )
}