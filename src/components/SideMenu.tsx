'use client'

import useSession from "@/hooks/useSession";
import {
  ConfigIcon,
  LeftArrowIcon,
  LogoutIcon,
  UserIcon
} from "./Icons";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";

interface ISideMenuProps {
  menuOpen: boolean;
  handleCloseMenu: () => void;
}

export default function SideMenu({
  handleCloseMenu,
  menuOpen,
}: ISideMenuProps) {
  const session = useSession();
  const windowSize = useWindowSize();
  
  const handleCloseMenuOnMobile = () => {
    if (windowSize.width && windowSize.width <= 1024) {
      handleCloseMenu();
    }
  }

  return (
    <aside
      className={`h-screen bg-white transition-all duration-300 ${
        menuOpen ? "lg:w-[17rem] w-screen p-5" : "w-0"
      } overflow-hidden rounded-r-2xl shadow-xl fixed top-0 left-0 z-20`}
    >
      <div className="flex items-center content-center flex-col min-w-max">
        <button className="self-end" onClick={handleCloseMenu}>
          <LeftArrowIcon
            width="w-10"
            height="h-10"
            className="text-white border-2 border-tuna p-1 hover:text-tuna bg-tuna hover:bg-white rounded-full cursor-pointer"
          />
        </button>
        <span className="mt-12">
          <UserIcon width="w-32" height="h-32" className="text-tuna stroke-1" />
        </span>
        <p className="text-tuna font-normal text-lg">Cadastro de Usuários</p>
      </div>
      <nav className="mt-12 min-w-max">
        <Link className="flex no-underline text-tuna hover:text-chetwodeBlue" href="/" onClick={handleCloseMenuOnMobile}>
          <UserIcon className="mr-2" />
          Início
        </Link>
        <hr className="text-tuna border-tuna my-4 border-2 rounded-xl" />
        <Link href="/profile" className="flex no-underline text-tuna hover:text-chetwodeBlue mb-4" onClick={handleCloseMenuOnMobile}>
          <ConfigIcon className="mr-2" />
          Configurações
        </Link>
        <button
          type="button"
          onClick={() => session.signOut()}
          className="flex no-underline text-tuna hover:text-chetwodeBlue mb-4"
        >
          <LogoutIcon className="mr-2" />
          Sair
        </button>
      </nav>
    </aside>
  );
}
