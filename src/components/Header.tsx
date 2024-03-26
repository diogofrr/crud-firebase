import { MenuHamburguerIcon } from "./Icons";
import Image from "next/image";
import useSession from "@/hooks/useSession";

interface IHeaderProps {
  handleOpenMenu: () => void;
  menuOpen: boolean;
}

export default function Header({ menuOpen, handleOpenMenu }: IHeaderProps) {
  const { profileData } = useSession();
  const name = profileData?.userData?.name.split(' ')
  const url = profileData?.userData?.profilePicture

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
          <div className="relative w-9 h-9 mr-2">
            <Image
              src={profileData?.userData?.profilePicture}
              alt={`Foto de perfil de ${profileData?.userData?.name}`}
              className="rounded-full mr-2"
              priority
              quality={100}
              fill
            />
          </div>
        ) : (
          <div className="relative w-9 h-9 bg-chetwodeBlue rounded-full mr-2 flex items-center justify-center">
            {name && (
              <p className="text-white text-sm">{`${name[0][0]}${Boolean(name[1]?.[0]) ? name[1][0] : ''}`}</p>
            )}
          </div>
        )}
        <p className="text-tuna mr-2 capitalize">
          {name && `${name[0]} ${name.length > 1 ? `${name[name.length - 1][0]}.` : ''}`}
        </p>
      </span>
    </header>
  );
}
