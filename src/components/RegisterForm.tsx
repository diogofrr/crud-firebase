'use client'

import { useCallback, useContext } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import { StatusContext } from "@/contexts/Status/StatusContext";
import { confirmPasswordFieldValidation, emailFieldValidation, nameFieldValidation, passwordFieldValidation } from "@/utils/validations";
import Field from "./Field";
import Button from "./Button";

export default function RegisterForm() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const { values, handleChangeValue, handleSubmit, handleValidate, errors } = useFormValidation(initialValues)
  const context = useContext(StatusContext)

  const handleSaveAndValidateLogin = useCallback(() => {
    context?.startLoading('Validando informações...')
    handleValidate(() => {
      const updatedErrors = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }

      updatedErrors.name = nameFieldValidation(errors, values.name).name
      updatedErrors.email = emailFieldValidation(errors, values.email).email
      updatedErrors.password = passwordFieldValidation(errors, values.password).password
      updatedErrors.confirmPassword = confirmPasswordFieldValidation(errors, values.confirmPassword, values.password).confirmPassword

      return updatedErrors
    })
  }, [context, errors, handleValidate, values.confirmPassword, values.email, values.name, values.password])

  return (
    <form className="w-full h-full" onSubmit={(e) => handleSubmit(e, handleSaveAndValidateLogin)}>
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
      />
      <Button color="hippieGreen" type="submit" className="w-full h-9 mb-12">Finalizar cadastro</Button>
      <div className="flex items-center justify-center flex-col">
        <p className="text-tuna text-base">Já possui uma conta?</p>
        <a href="/auth/login" className="text-chetwodeBlue hover:underline text-base">Realizar login</a>
      </div>
    </form>
  )
}