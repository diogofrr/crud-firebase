import Link from "next/link";
import { ConfigIcon, LeftArrowIcon, LogoutIcon, UserIcon, XIcon } from "./Icons";

interface IMenuItemProps {
  children: React.ReactNode
  className?: string
  href: string
}

interface ISideMenuProps {
  menuOpen: boolean
  handleCloseMenu: () => void
}

export default function SideMenu({ handleCloseMenu, menuOpen }: ISideMenuProps) {
  function MenuItem({ children, className, href }: IMenuItemProps) {
    return (
      <Link href={href} className={`${className} flex no-underline text-tuna hover:text-chetwodeBlue`}>
        {children}
      </Link>
    )
  }

  return (
    <aside className={`h-screen bg-white transition-all duration-300 ${menuOpen ? "lg:w-[17rem] w-screen p-5" : "w-0"} overflow-hidden rounded-r-2xl shadow-xl fixed top-0 left-0 z-20`}>
        <div className="flex items-center content-center flex-col min-w-max">
          <button className="self-end" onClick={handleCloseMenu}>
            <LeftArrowIcon width="w-10" height="h-10" className="text-white border-2 border-tuna p-1 hover:text-tuna bg-tuna hover:bg-white rounded-full cursor-pointer"/>  
          </button>
          <span className="mt-12">
            <UserIcon width="w-32" height="h-32" className="text-tuna stroke-1" />
          </span>
          <p className="text-tuna font-normal text-lg">Cadastro de Usuários</p>
        </div>
        <nav className="mt-12 min-w-max">
          <MenuItem href="/">
            <UserIcon className="mr-2" />
            Início
          </MenuItem>
          <hr className="text-tuna border-tuna my-4 border-2 rounded-xl" />
          <MenuItem href="/" className="mb-4">
            <ConfigIcon className="mr-2" />
            Configurações
          </MenuItem>
          <MenuItem href="/">
            <LogoutIcon className="mr-2" />
            Sair
          </MenuItem>
        </nav>
    </aside>
  )
}