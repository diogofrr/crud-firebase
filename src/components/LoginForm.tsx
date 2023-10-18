'use client'

import { useCallback, useContext } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import { StatusContext } from "@/contexts/Status/StatusContext";
import { emailFieldValidation } from "@/utils/validations";
import Field from "./Field";
import Button from "./Button";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import SnackBar from "./SnackBar";
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const initialValues = {
    email: '',
    password: ''
  }
  const { values, handleChangeValue, handleSubmit, handleValidate, errors } = useFormValidation(initialValues)
  const { startLoading, stopLoading, state, closeSnackBar } = useContext(StatusContext)
  const [
    signInWithEmailAndPassword,
    user,
    loading,
  ] = useSignInWithEmailAndPassword(getAuth());

  const router = useRouter()

  const handleSaveAndValidateLogin = useCallback(() => {
    startLoading('Validando informações...')
    handleValidate(() => {
      const updatedErrors = {
        email: '',
        password: ''
      }

      updatedErrors.email = emailFieldValidation(errors, values.email).email

      if (Object.values(updatedErrors).every(error => error === '')) {
        signInWithEmailAndPassword(values.email.trim(), values.password.trim())
          .then((credentials) => {
            if (!credentials) {
              stopLoading({
                status: "error",
                message: "Usuário e/ou senha inválidos."
              })
            } else {
              stopLoading({
                status: "success",
                message: "Login realizado com sucesso."
              })

              router.push('/')
            }
          })
          .catch((error) => {
            stopLoading({
              status: "error",
              message: error.message
            })
          })
      } else {
        stopLoading({
          status: "error",
          message: "Preencha os campos corretamente."
        })
      }

      return updatedErrors
    })

  }, [errors, handleValidate, router, signInWithEmailAndPassword, startLoading, stopLoading, values.email, values.password])

  return (
    <>
      <SnackBar message={state.message} open={state.snackbarOpen} type={state.status} closeSnackBar={closeSnackBar} />
      <form className="w-full h-full" onSubmit={(e) => handleSubmit(e, handleSaveAndValidateLogin)}>
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
        <a href="/" className="text-chetwodeBlue w-full block text-right mb-4 hover:underline text-base">Esqueceu sua senha?</a>
        <Button color={loading ? "gray" : "hippieGreen"} type="submit" disabled={loading} className="w-full h-9 mb-12">Entrar</Button>
        <div className="flex items-center justify-center flex-col">
          <p className="text-tuna text-base">Não tem uma conta?</p>
          <a href="/auth/register" className="text-chetwodeBlue hover:underline text-base">Registre-se</a>
        </div>
      </form>
    </>
  )
}