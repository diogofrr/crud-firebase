'use client'

import Button from "./Button";
import Modal from "./Modal";
import Field from "./Field";
import useFormValidation from "@/hooks/useFormValidation";
import { useCallback, useContext } from "react";
import { requiredFieldValidation } from "@/utils/validations";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/firebase/config";
import { StatusContext } from "@/contexts/Status/StatusContext";
import { LOADING } from "@/constants/constants";

interface IUpdateEmailModalProps {
  action: () => void;
  open: boolean;
  handleCloseModal: () => void;
}

export default function UpdateEmailModal({
  open,
  handleCloseModal,
  action,
}: IUpdateEmailModalProps) {
  const initialValues = {
    password: "",
  };

  const { values, handleChangeValue, handleSubmit, handleValidate, errors } =
    useFormValidation(initialValues);
  const { startLoading, stopLoading, state } = useContext(StatusContext);

  const handleRevalidateUserSession = useCallback(() => {
    startLoading("");
    handleValidate(() => {
      const updatedErrors = {
        password: "",
      };

      updatedErrors.password = requiredFieldValidation(
        errors,
        values.password
      ).password;

      if (Object.values(updatedErrors).every((error) => error === "")) {
        if (auth.currentUser?.email) {
          const credentials = EmailAuthProvider.credential(
            auth.currentUser.email,
            values.password
          );
          reauthenticateWithCredential(auth.currentUser, credentials)
            .then(() => action())
            .catch((err) => {
              stopLoading({
                status: "idle",
                message: "",
              });
              updatedErrors.password = "Senha incorreta";
            });
        }
      }

      return updatedErrors;
    });
  }, [
    action,
    errors,
    handleValidate,
    startLoading,
    stopLoading,
    values.password,
  ]);

  return (
    <Modal size="w-[32rem] h-72" open={open}>
      <div className="flex justify-center flex-col gap-4 w-full h-full">
        <p className="text-tuna text-xl text-start">Confirme sua senha:</p>
        <form
          className="w-full"
          onSubmit={(e) => handleSubmit(e, handleRevalidateUserSession)}
        >
          <Field
            text="Senha"
            type="password"
            value={values.password}
            onChange={handleChangeValue}
            name="password"
            id="passwordField"
            errors={errors}
            placeholder="Insira a sua senha"
            baseColor="secondary"
            className="mb-3"
            autoComplete="current-password"
          />
          <div className="flex gap-4">
            <Button
              color={state.status === LOADING ? "gray" : "hippieGreen"}
              type="submit"
              disabled={state.status === LOADING}
            >
              Confirmar
            </Button>
            <Button
              color="gray"
              onClick={handleCloseModal}
              disabled={state.status === LOADING}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
