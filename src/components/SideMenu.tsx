import Link from "next/link";
import { ConfigIcon, LogoutIcon, UserIcon } from "./Icons";

interface IMenuItemProps {
  children: React.ReactNode
  className?: string
}

export default function SideMenu() {
  function MenuItem({ children, className }: IMenuItemProps) {
    return (
      <Link href="" className={`${className} flex no-underline text-tuna hover:text-chetwodeBlue`}>
        {children}
      </Link>
    )
  }

  return (
    <aside className="h-screen bg-white w-[17rem] p-5 rounded-r-2xl shadow-xl fixed">
        <div className="flex items-center content-center flex-col">
          <span className="mt-12">
            <UserIcon width="w-32" height="h-32" className="text-tuna stroke-1" />
          </span>
          <p className="text-tuna font-normal text-lg">Cadastro de Usuários</p>
        </div>
        <nav className="mt-12">
          <MenuItem>
            <UserIcon className="mr-2" />
            Início
          </MenuItem>
          <hr className="text-tuna border-tuna my-4 border-2 rounded-xl" />
          <MenuItem className="mb-4">
            <ConfigIcon className="mr-2" />
            Configurações
          </MenuItem>
          <MenuItem>
            <LogoutIcon className="mr-2" />
            Sair
          </MenuItem>
        </nav>
    </aside>
  )
}