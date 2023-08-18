import { ChevronDownIcon } from "./Icons";

export default function Header() {
  return (
    <header className="flex justify-end items-center py-8">
      <span className="cursor-pointer flex justify-end items-center">
        <span className="w-8 h-8 bg-white rounded-full mr-2"></span>
        <p className="text-tuna mr-2">Diogo F.</p>
        <ChevronDownIcon width="w-4" height="h-4" className="text-tuna stroke-2" />
      </span>
    </header>
  )
}