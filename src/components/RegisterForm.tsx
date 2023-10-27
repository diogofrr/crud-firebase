'use client'

import { useCallback, useContext } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import { StatusContext } from "@/contexts/Status/StatusContext";
import {
  confirmPasswordFieldValidation,
  emailFieldValidation,
  nameFieldValidation,
  passwordFieldValidation,
} from "@/utils/validations";
import Field from "./Field";
import Button from "./Button";
import SnackBar from "./SnackBar";
import useSession from "@/hooks/useSession";
import User from "@/core/User";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { LOADING } from "@/constants/constants";
import Link from "next/link";

export default function RegisterForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, handleChangeValue, handleSubmit, handleValidate, errors } =
    useFormValidation(initialValues);
  const { state, startLoading, stopLoading, closeSnackBar } =
    useContext(StatusContext);
  const { createUserInformation } = useSession();

  const handleSaveAndValidateLogin = useCallback(() => {
    startLoading("Realizando cadastro...");
    handleValidate(() => {
      const updatedErrors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

      updatedErrors.name = nameFieldValidation(errors, values.name).name;
      updatedErrors.email = emailFieldValidation(errors, values.email).email;
      updatedErrors.password = passwordFieldValidation(
        errors,
        values.password
      ).password;
      updatedErrors.confirmPassword = confirmPasswordFieldValidation(
        errors,
        values.confirmPassword,
        values.password
      ).confirmPassword;

      if (Object.values(updatedErrors).every((error) => error === "")) {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userObject) => {
            if (userObject) {
              createUserInformation(
                new User(
                  values.name.trim(),
                  "",
                  values.email.trim(),
                  userObject.user.uid
                )
              ).then(() => {
                stopLoading({
                  status: "success",
                  message: "Cadastro realizado com sucesso!",
                });
              });
            }
          })
          .catch(() => {
            updatedErrors.email = "Este email já está cadastrado.";
            stopLoading({
              status: "error",
              message: "Erro ao realizar cadastro.",
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
    createUserInformation,
    errors,
    handleValidate,
    startLoading,
    stopLoading,
    values.confirmPassword,
    values.email,
    values.name,
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
          text="Nome completo"
          type="text"
          value={values.name}
          onChange={handleChangeValue}
          name="name"
          id="nameField"
          errors={errors}
          placeholder="Insira o seu email"
          baseColor="secondary"
          validation={nameFieldValidation}
        />
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
          validation={passwordFieldValidation}
          comparativeValue={values.password}
          autoComplete="new-password"
        />
        <Field
          text="Confirme sua senha"
          type="password"
          value={values.confirmPassword}
          onChange={handleChangeValue}
          name="confirmPassword"
          id="confirmPasswordField"
          errors={errors}
          placeholder="Insira a sua senha novamente"
          baseColor="secondary"
          className="mb-6"
          validation={confirmPasswordFieldValidation}
          comparativeValue={values.password}
          autoComplete="new-password"
        />
        <Button
          color={state.status === LOADING ? "gray" : "hippieGreen"}
          type="submit"
          disabled={state.status === LOADING}
          className="w-full h-9 mb-12"
        >
          Cadastrar
        </Button>
        <div className="flex items-center justify-center flex-col">
          <p className="text-tuna text-base">Já possui uma conta?</p>
          <Link
            href="/auth/login"
            className="text-chetwodeBlue hover:underline text-base"
          >
            Realizar login
          </Link>
        </div>
      </form>
    </>
  );
}
