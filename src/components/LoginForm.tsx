'use client'

import { useCallback, useContext } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import { StatusContext } from "@/contexts/Status/StatusContext";
import { emailFieldValidation, passwordFieldValidation } from "@/utils/validations";
import Field from "./Field";
import Button from "./Button";

export default function LoginForm() {
  const initialValues = {
    email: '',
    password: ''
  }

  const { values, handleChangeValue, handleSubmit, handleValidate, errors } = useFormValidation(initialValues)
  const context = useContext(StatusContext)

  const handleSaveAndValidateLogin = useCallback(() => {
    context?.startLoading('Validando informações...')
    handleValidate(() => {
      const updatedErrors = {
        email: '',
        password: ''
      }

      updatedErrors.email = emailFieldValidation(errors, values.email).email

      return updatedErrors
    })
  }, [context, errors, handleValidate, values.email])

  return (
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
      />
      <a href="/" className="text-chetwodeBlue w-full block text-right mb-4 hover:underline text-base">Esqueceu sua senha?</a>
      <Button color="hippieGreen" type="submit" className="w-full h-9 mb-12">Entrar</Button>
      <div className="flex items-center justify-center flex-col">
        <p className="text-tuna text-base">Não tem uma conta?</p>
        <a href="/auth/register" className="text-chetwodeBlue hover:underline text-base">Registre-se</a>
      </div>
    </form>
  )
}