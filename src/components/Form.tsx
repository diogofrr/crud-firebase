'use client'

import Field from "./Field";
import Client from "@/core/Client";
import Button from "./Button";
import useFormValidation from "@/hooks/useFormValidation";
import { STATUS } from "@/types/global";
import { Spinner } from "@/components/Icons"
import { useContext } from "react";
import { Context as StatusContext } from "@/contexts/Status/StatusContext"

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
    age: client?.age ?? ''
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
        age: ''
      }

      updatedErrors.name = nameFieldValidation(values.name).name
      updatedErrors.age = ageFieldValidation(+values.age).age

      if (Object.values(updatedErrors).every(error => error === '')) saveClient?.(new Client(values.name, +values.age, values.id))
    
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

  function ageFieldValidation(value: number) {
    const updatedErrors = errors
    value = +value

    if (value <= 0 || value > 120 || !Number.isInteger(value) || isNaN(value)) {
      updatedErrors.age = 'Por favor, insira uma idade válida.'
    } else {
      updatedErrors.age = ''
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
          text="Idade"
          type="number"
          value={values.age}
          onChange={handleChangeValue}
          name="age"
          id="ageField"
          errors={errors}
          validation={ageFieldValidation}
          placeholder="Digite a idade do cliente"
        />
        <div className="flex justify-end mt-7">
          <Button
            type="submit"
            color="green"
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