import { ChevronDownIcon, MenuHamburguerIcon } from "./Icons";

interface IHeaderProps {
  handleOpenMenu: () => void
  menuOpen: boolean
}

export default function Header({ menuOpen, handleOpenMenu }: IHeaderProps) {
  return (
    <header className="flex items-center pt-8 h-20">
      {!menuOpen && (
        <button className="p-2 bg-white rounded-full shadow-xl cursor-pointer hover:bg-gray-50" onClick={handleOpenMenu}>
          <MenuHamburguerIcon width="w-7" height="h-7" className="text-tuna" />
        </button>
      )}
      <span className="cursor-pointer flex ml-auto items-center">
        <span className="w-8 h-8 bg-white rounded-full mr-2"></span>
        <p className="text-tuna mr-2">Diogo F.</p>
        <ChevronDownIcon width="w-4" height="h-4" className="text-tuna stroke-2" />
      </span>
    </header>
  )
}