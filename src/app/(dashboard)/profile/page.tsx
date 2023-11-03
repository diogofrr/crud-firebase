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
  };
  const { values, handleChangeValue, errors, handleSubmit, handleValidate } =
    useFormValidation(initialValues);

  const name = session.profileData?.userData?.name.split(' ')

  const handleProfileFormSubmit = () => {
    handleValidate(() => {
      const updatedErrors = {
        email: "",
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
            stopLoading({
              status: "success",
              message: "Verifique seu email para finalizar a alteração.",
            });
            session.signOut()
          } else {
            throw new Error("Usuário não encontrado.");
          }
        })
        .catch(() => {
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

  const handleSaveProfilePicture = (event: React.FormEvent<HTMLInputElement>) => {
    startLoading("Alterando a foto de perfil...");
    const file = event.currentTarget.files?.[0];

    if (file) {
      const blob = new Blob([file], { type: file.type });

      session.uploadProfilePicture(blob).then(() => {
        stopLoading({
          message: "Imagem alterada com sucesso",
          status: "success"
        });
      })
      .catch(() => {
        stopLoading({
          message: "Não foi possível alterar a foto de perfil.",
          status: "error"
        });
      })
    } else {
      stopLoading({
        message: "Houve um erro ao alterar a imagem",
        status: "error"
      });
    }
  }

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
          <div className="relative w-56 h-56">
            {session.profileData?.userData?.profilePicture ? (
              <Image
                src={session.profileData.userData.profilePicture.toString()}
                alt={`Foto de perfil de ${session.profileData.userData.name}`}
                className="rounded-full"
                fill
                priority
                quality={100}
              />
            ) : (
              <div className="relative w-56 h-56 bg-chetwodeBlue rounded-full flex items-center justify-center">
                {name && (
                  <p className="text-white text-6xl">{`${name[0][0]}${name[1][0]}`}</p>
                )}
              </div>
            )}
            <label htmlFor="profile-picture" className="bg-titanWhite hover:bg-chetwodeBlue group rounded-full p-1 absolute right-4 top-3/4 border-2 border-chetwodeBlue hover:border-titanWhite cursor-pointer">
              <input id="profile-picture" className="hidden" name="profile-picture" type="file" accept="image/*" onChange={(e) => handleSaveProfilePicture(e)} />
              <CamIcon height="w-8" width="h-8" className="text-chetwodeBlue group-hover:text-titanWhite" />
            </label>
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
