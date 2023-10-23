"use client";

import { useCallback, useContext, useEffect } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import { StatusContext } from "@/contexts/Status/StatusContext";
import {
  emailFieldValidation,
  requiredFieldValidation,
} from "@/utils/validations";
import Field from "./Field";
import Button from "./Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import SnackBar from "./SnackBar";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import useSession from "@/hooks/useSession";
import { LOADING } from "@/constants/constants";
import Link from "next/link";

export default function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, handleChangeValue, handleSubmit, handleValidate, errors } =
    useFormValidation(initialValues);
  const { startLoading, stopLoading, state, closeSnackBar, resetStatus } =
    useContext(StatusContext);
  const { getUserInformation } = useSession();

  const handleSaveAndValidateLogin = useCallback(() => {
    startLoading("Validando informações...");
    handleValidate(() => {
      const updatedErrors = {
        email: "",
        password: "",
      };

      updatedErrors.email = emailFieldValidation(errors, values.email).email;
      updatedErrors.password = requiredFieldValidation(
        errors,
        values.password
      ).password;

      if (Object.values(updatedErrors).every((error) => error === "")) {
        signInWithEmailAndPassword(
          auth,
          values.email.trim(),
          values.password.trim()
        )
          .then((credentials) => {
            if (credentials) {
              stopLoading({
                status: "success",
                message: "Login realizado com sucesso.",
              });
              getUserInformation();
            }
          })
          .catch(() => {
            stopLoading({
              status: "error",
              message: "Usuário e/ou senha inválidos.",
            });
          });
      } else {
        stopLoading({
          status: "error",
          message: "Preencha os campos corretamente.",
        });
      }

      return updatedErrors;
    });
  }, [
    errors,
    getUserInformation,
    handleValidate,
    startLoading,
    stopLoading,
    values.email,
    values.password,
  ]);

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
        onSubmit={(e) => handleSubmit(e, handleSaveAndValidateLogin)}
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
        />
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
        <Link
          href="/auth/forgot-password"
          className="text-chetwodeBlue w-full block text-right mb-4 hover:underline text-base"
        >
          Esqueceu sua senha?
        </Link>
        <Button
          color={state.status === LOADING ? "gray" : "hippieGreen"}
          type="submit"
          disabled={state.status === LOADING}
          className="w-full h-9 mb-12"
        >
          Entrar
        </Button>
        <div className="flex items-center justify-center flex-col">
          <p className="text-tuna text-base">Não tem uma conta?</p>
          <Link
            href="/auth/register"
            className="text-chetwodeBlue hover:underline text-base"
          >
            Registre-se
          </Link>
        </div>
      </form>
    </>
  );
}
