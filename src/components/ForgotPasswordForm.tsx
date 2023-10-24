"use client";

import useFormValidation from "@/hooks/useFormValidation";
import Field from "./Field";
import { emailFieldValidation } from "@/utils/validations";
import { Dispatch, SetStateAction, useContext } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";
import Button from "./Button";
import { LOADING } from "@/constants/constants";
import SnackBar from "./SnackBar";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";

interface IForgotPasswordForm {
  setEmailWasSent: (Dispatch<SetStateAction<boolean>>)
}

export default function ForgotPasswordForm({ setEmailWasSent }: IForgotPasswordForm) {
  const initialValues = {
    email: "",
  };
  const { values, handleChangeValue, handleSubmit, handleValidate, errors } =
    useFormValidation(initialValues);
  const { startLoading, stopLoading, state, closeSnackBar } =
    useContext(StatusContext);

  const handleValidateAndSendEmail = () => {
    handleValidate(() => {
      const updatedErrors = {
        email: "",
      };
      
      updatedErrors.email = emailFieldValidation(errors, values.email).email;
      
      if (Object.values(updatedErrors).every((error) => error === "")) {
        sendPasswordResetEmail(auth, values.email)
          .then(() => {
            setEmailWasSent(true)
            stopLoading({
              status: "success",
              message: "Email enviado com sucesso.",
            })
          })
          .catch(() => {
            stopLoading({
              status: "error",
              message: "Houve um erro ao realizar o envio do email.",
            });
          })
      } else {
        stopLoading({
          status: "error",
          message: "Preencha os campos corretamente.",
        });
      }

      return updatedErrors;
    });
  };

  return (
    <>
      <SnackBar
        message={state.message}
        open={state.snackbarOpen}
        type={state.status}
        closeSnackBar={closeSnackBar}
      />
      <form
        className="w-full h-full"
        onSubmit={(e) => handleSubmit(e, handleValidateAndSendEmail)}
      >
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
          className="mb-4"
        />
        <Button
          color={state.status === LOADING ? "gray" : "hippieGreen"}
          type="submit"
          disabled={state.status === LOADING}
          className="w-full h-9 mb-12"
        >
          Enviar
        </Button>
      </form>
    </>
  );
}
