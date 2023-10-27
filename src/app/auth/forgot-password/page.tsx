'use client'

import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { EnvelopeIcon } from "@/components/Icons";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [emailWasSent, setEmailWasSent] = useState<boolean>(false);

  return (
    <div className="bg-titanWhite w-screen h-screen min-h-[580px] sm:py-8 flex items-center justify-center">
      <div className="w-full h-full sm:h-auto sm:w-[560px] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center px-4 sm:px-8 py-16">
        <div className="flex flex-col items-center justify-center">
          {emailWasSent ? (
            <>
              <EnvelopeIcon
                className="text-tuna mb-4"
                width="w-24"
                height="w-24"
              />
              <h1 className="text-4xl text-tuna text-center font-medium mb-2">
                Email enviado com sucesso
              </h1>
              <p className="text-base text-tuna text-center font-normal mb-4">
                Verifique sua caixa de entrada, caso não esteja lá, verifique
                também a caixa de spam.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl text-tuna text-center font-medium mb-2">
                Altere sua senha
              </h1>
              <p className="text-base text-tuna text-center font-normal mb-4">
                Insira seu email para receber um link de alteração de senha.
              </p>
              <ForgotPasswordForm setEmailWasSent={setEmailWasSent} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
