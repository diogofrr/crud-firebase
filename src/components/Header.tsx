import { MenuHamburguerIcon } from "./Icons";
import Image from "next/image";
import useSession from "@/hooks/useSession";

interface IHeaderProps {
  handleOpenMenu: () => void;
  menuOpen: boolean;
}

export default function Header({ menuOpen, handleOpenMenu }: IHeaderProps) {
  const { profileData } = useSession();

  return (
    <header className="flex items-center pt-8 h-20">
      {!menuOpen && (
        <button
          className="p-2 bg-white rounded-full shadow-xl cursor-pointer hover:bg-gray-50"
          onClick={handleOpenMenu}
        >
          <MenuHamburguerIcon width="w-7" height="h-7" className="text-tuna" />
        </button>
      )}
      <span className="flex ml-auto items-center">
        {profileData?.userData?.profilePicture ? (
          <Image
            src={profileData?.userData?.profilePicture}
            alt={`Foto de perfil de ${profileData?.userData?.name}`}
            width={32}
            height={32}
            className="rounded-full mr-2"
            priority
            quality={100}
            fill
          />
        ) : (
          <span className="w-8 h-8 bg-white rounded-full mr-2"></span>
        )}
        <p className="text-tuna mr-2 capitalize">
          {profileData?.userData?.name}
        </p>
      </span>
    </header>
  );
}
