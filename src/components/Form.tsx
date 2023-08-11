'use client'

import Field from "./Field";
import Client from "@/core/Client";
import Button from "./Button";
import useFormValidation from "@/hooks/useFormValidation";
import { STATUS } from "@/types/global";
import { Spinner } from "@/components/Icons"
import { useContext } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext"
import { formatDateToYYYYMMDD, parseDateString, timestampToDate } from "@/utils/formatDate";

interface IFormProps {
  client: Client
  cancel: () => void
  saveClient?: (cliente: Client) => void
  status: STATUS
}
export default function Form({ client, cancel, saveClient }: IFormProps) {
  const initialValues = {
    id: client?.id,
    name: client?.name ?? '',
    birthday: formatDateToYYYYMMDD(timestampToDate(client?.birthday)) ?? new Date(),
    tel: client?.tel ?? '',
    email: client?.email ?? ''
  }

  const { values, handleChangeValue, handleSubmit, handleValidate, errors } = useFormValidation(initialValues)

  const context = useContext(StatusContext)

  if (context === null) return null

  const { startLoading, stopLoading, state: { status } } = context

  function handleSaveAndValidateClient() {
    startLoading('Salvando cliente...')
    handleValidate(() => {
      const updatedErrors = {
        name: '',
        birthday: '',
        tel: '',
        email: ''
      }

      updatedErrors.name = nameFieldValidation(values.name).name
      updatedErrors.birthday = birthdatFieldValidation(values.birthday.toString()).birthday
      updatedErrors.tel = telFieldValidation(values.tel).tel
      updatedErrors.email = emailFieldValidation(values.email).email

      if (Object.values(updatedErrors).every(error => error === '')) {
        saveClient?.(new Client(values.name, parseDateString(values.birthday.toString()), values.tel, values.email, values.id))
      }  else {
        stopLoading({
          status: "error",
          message: "Preencha os campos corretamente."
        })
      }
    
      return updatedErrors
    })
  }

  function nameFieldValidation(value: string) {
    const updatedErrors = errors

    if (value === '') {
      updatedErrors.name = 'Por favor, insira um nome válido.'
    } else {
      updatedErrors.name = ''
    }

    return updatedErrors
  }

  function birthdatFieldValidation(value: string) {
    const updatedErrors = errors

    const updatedValue = parseDateString(value)

    if (updatedValue >= new Date() || updatedValue.toString() === "Invalid Date") {
      updatedErrors.birthday = 'Por favor, insira uma data válida.'
    } else {
      updatedErrors.birthday = ''
    }

    return updatedErrors
  }

  function telFieldValidation(value: string) {
    const updatedErrors = errors

    if (value === '') {
      updatedErrors.tel = 'Por favor, insira um telefone válido.'
    } else {
      updatedErrors.tel = ''
    }

    return updatedErrors
  }
  
  function emailFieldValidation(value: string) {
    const updatedErrors = errors

    if (value === '') {
      updatedErrors.email = 'Por favor, insira um email válido.'
    } else {
      updatedErrors.email = ''
    }

    return updatedErrors
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, handleSaveAndValidateClient)}>
        {values.id && (
          <Field
            text="Código"
            value={values.id}
            type="text"
            readOnly={true}
            name="id"
            id="fieldId"
            errors={errors}
          />
        )}
        <Field
          text="Nome"
          type="text"
          value={values.name}
          onChange={handleChangeValue}
          name="name"
          id="nameField"
          errors={errors}
          validation={nameFieldValidation}
          placeholder="Digite o nome do cliente"
        />
        <Field
          text="Data de nascimento"
          type="date"
          value={values.birthday}
          onChange={handleChangeValue}
          name="birthday"
          id="birthdayField"
          errors={errors}
          validation={birthdatFieldValidation}
        />
        <Field
          text="Telefone"
          type="tel"
          value={values.tel}
          onChange={handleChangeValue}
          name="tel"
          id="telField"
          errors={errors}
          validation={telFieldValidation}
          placeholder="Insira o telefone do cliente"
        />
        <Field
          text="Email"
          type="email"
          value={values.email}
          onChange={handleChangeValue}
          name="email"
          id="emailField"
          errors={errors}
          validation={emailFieldValidation}
          placeholder="Insira o email do cliente"
        />
        <div className="flex justify-end mt-7">
          <Button
            type="submit"
            color={status === 'loading' ? 'gray' : 'green'}
            className="mr-2"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <Spinner color="fill-green-700" width="w-5" height="w-5"  className="mx-5"/>
            ) 
            : (
              values.id ? 'ALTERAR': 'SALVAR'
            )}
          </Button>
          <Button onClick={cancel} color="gray">
            CANCELAR
          </Button>
        </div>
      </form>
    </>
  )
}