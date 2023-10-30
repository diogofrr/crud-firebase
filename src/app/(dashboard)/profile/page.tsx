'use client'

import Image from "next/image";
import useSession from "@/hooks/useSession";
import { CamIcon, VerfiedIcon } from "@/components/Icons";
import Field from "@/components/Field";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  updateEmail,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useContext } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";
import Button from "@/components/Button";
import UpdateEmailModal from "@/components/UpdateEmailModal";
import useModal from "@/hooks/useModal";
import useFormValidation from "@/hooks/useFormValidation";
import { emailFieldValidation } from "@/utils/validations";
import { LOADING } from "@/constants/constants";

export default function Profile() {
  const session = useSession();
  const context = useContext(StatusContext);
  const { startLoading, stopLoading, state } = context;
  const { handleCloseModal, handleOpenModal, openModal } = useModal();
  const initialValues = {
    email: session.profileData?.userData?.email ?? "",
    password: "",
  };
  const { values, handleChangeValue, errors, handleSubmit, handleValidate } =
    useFormValidation(initialValues);

  const handleProfileFormSubmit = () => {
    handleValidate(() => {
      const updatedErrors = {
        email: "",
        password: "",
      };

      updatedErrors.email = emailFieldValidation(errors, values.email).email;

      if (Object.values(updatedErrors).every((error) => error === "")) {
        handleOpenModal();
      } else {
        stopLoading({
          status: "error",
          message: "Preencha os campos corretamente.",
        });
      }

      return updatedErrors;
    });
  };

  const handleSendPasswordResetEmail = () => {
    if (session.profileData?.userData) {
      startLoading("Enviado email...");
      sendPasswordResetEmail(auth, session.profileData.userData.email)
        .then(() => {
          stopLoading({
            status: "success",
            message:
              "Verifique seu email para prosseguir com a alteração da senha!",
          });
        })
        .catch(() =>
          stopLoading({
            status: "error",
            message: "Ocorreu um erro ao enviar o email.",
          })
        );
    } else {
      stopLoading({
        status: "error",
        message: "Você não está autenticado.",
      });
    }
  };

  const handleChangeEmail = () => {
    if (auth.currentUser && session.profileData?.userData) {
      handleCloseModal();
      startLoading("Atualizando email...");

      verifyBeforeUpdateEmail(auth.currentUser, values.email)
        .then(() => {
          if (session.profileData?.userData) {
            const user = session.profileData.userData;
            user.email = values.email;

            session
              .updateUserInformation(user)
              .then(() => {
                stopLoading({
                  status: "success",
                  message: "Verifique seu email para finalizar a alteração.",
                });
              })
              .then(() => session.signOut());
          } else {
            throw new Error("Usuário não encontrado.");
          }
        })
        .catch((err) => {
          stopLoading({
            status: "warning",
            message: "Houve um erro ao tentar atualizar o email.",
          });
        });
    }
  };

  const handleSendEmailVerification = () => {
    startLoading("Enviando email de verificação...");
    if (auth.currentUser)
      sendEmailVerification(auth.currentUser)
        .then(() => {
          stopLoading({
            message: "Email enviado com sucesso!",
            status: "success",
          });
        })
        .catch(() => {
          stopLoading({
            message: "Ocorreu um erro ao enviar o email.",
            status: "error",
          });
        });
  };

  return (
    <>
      {session.profileData?.userData?.email && (
        <UpdateEmailModal
          open={openModal}
          handleCloseModal={handleCloseModal}
          action={handleChangeEmail}
        />
      )}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl h-[780px] pt-12 mx-auto">
        <div className="flex flex-col gap-5 items-center justify-center w-full max-w-2xl mx-auto px-4">
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
              <div className="w-56 h-56 rounded-full bg-gray-100 border-2 border-tuna"></div>
            )}
            <button className="bg-titanWhite rounded-full p-1 absolute right-4 top-3/4 border-2 border-chetwodeBlue">
              <CamIcon height="w-8" width="h-8" className="text-chetwodeBlue" />
            </button>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <p className="capitalize text-tuna text-2xl sm:text-3xl text-center">
                {session.profileData?.userData?.name}
              </p>
              {session.profileData?.sessionData?.emailVerified && (
                <VerfiedIcon width="w-6" height="h-6" className="ml-2" />
              )}
            </div>
            <span className="text-tuna text-base block text-center">{`(${
              session.profileData?.sessionData?.emailVerified
                ? "Verificado"
                : "Não verificado"
            })`}</span>
          </div>
          <div className="w-full bg-tuna h-1"></div>
          <div className="mb-4 w-full">
            <form onSubmit={(e) => handleSubmit(e, handleProfileFormSubmit)}>
              <Field
                text="Email"
                type="email"
                value={values.email}
                onChange={handleChangeValue}
                name="email"
                id="emailField"
                errors={errors}
                placeholder="Insira o seu email"
                baseColor="secondary"
                validation={emailFieldValidation}
                autoComplete="email"
              />
              <Button
                color={
                  state.status === LOADING ||
                  !session.profileData?.sessionData?.emailVerified
                    ? "gray"
                    : "hippieGreen"
                }
                type="submit"
                disabled={
                  state.status === LOADING ||
                  !session.profileData?.sessionData?.emailVerified
                }
                className="w-full sm:w-autom mt-4"
              >
                Atualizar email
              </Button>
              <div>
                <p className="text-tuna font-medium mt-4">Ações</p>
                <ul className="text-tuna list-disc ml-8">
                  <li
                    className="text-chetwodeBlue cursor-pointer hover:underline"
                    onClick={handleSendEmailVerification}
                  >
                    Verificar email
                  </li>
                  <li
                    className="text-chetwodeBlue cursor-pointer hover:underline"
                    onClick={handleSendPasswordResetEmail}
                  >
                    Solicitar alteração de senha
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="self-start"></div>
        </div>
      </div>
    </>
  );
}
