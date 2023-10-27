"use client";

import Image from "next/image";
import useSession from "@/hooks/useSession";
import { PlusIcon } from "@/components/Icons";
import Field from "@/components/Field";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useContext } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";
import Button from "@/components/Button";

export default function Profile() {
  const session = useSession();
  const context = useContext(StatusContext);
  const { startLoading, stopLoading } = context;

  const handleSendPasswordResetEmail = () => {
    if (session.profileData?.userData) {
      startLoading("Enviado email...");
      sendPasswordResetEmail(
        auth,
        session.profileData.userData.email
      ).then(() => {
        stopLoading({
          status: "success",
          message:
            "Verifique seu email para prosseguir com a alteração da senha!",
        });
      })
      .catch(() => stopLoading({
        status: "error",
        message: "Ocorreu um erro ao enviar o email."
      }));
    } else {
      stopLoading({
        status: "error",
        message: "Você não está autenticado."
      })
    }
  }

  const handleChangeEmail = (email: string) => {

  }

  return (
    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl h-[780px] pt-12 mx-auto">
      <div className="flex flex-col gap-5 items-center justify-center w-full max-w-2xl mx-auto">
        <div className="relative">
          {session.profileData?.userData?.profilePicture ? (
            <Image
              src={session.profileData.userData.profilePicture}
              alt={`Foto de perfil de ${session.profileData.userData.name}`}
              width={224}
              height={224}
              className="rounded-full"
            />
          ) : (
            <div className="w-56 h-56 rounded-full bg-gray-200 border-2 border-tuna"></div>
          )}
          <button className="bg-titanWhite rounded-full p-1 absolute right-4 top-3/4 border-2 border-chetwodeBlue">
            <PlusIcon height="w-8" width="h-8" className="text-chetwodeBlue" />
          </button>
        </div>
        <p className="capitalize text-tuna text-3xl">
          {session.profileData?.userData?.name}
        </p>
        <div className="w-full bg-tuna h-1"></div>
        <form className="mb-4 w-full">
          <Field
            text="Email"
            value={session.profileData?.userData?.email}
            type="text"
            name="id"
            id="fieldId"
          />
          <div className="flex justify-between items-center">
            <Button onClick={() => null} className="mt-4">Atualizar email</Button>
            <p className="text-chetwodeBlue cursor-pointer hover:underline" onClick={handleSendPasswordResetEmail}>Solicitar alteração da senha</p>
          </div>
        </form>
        <div className="self-start">
        </div>
      </div>
    </div>
  );
}
