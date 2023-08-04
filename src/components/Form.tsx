'use client'

import Field from "./Field";
import Client from "@/core/Client";
import Button from "./Button";
import SnackBar from "./SnackBar";
import useStatus from "@/hooks/useStatus";
import useFormValidation from "@/hooks/useFormValidation";

interface IFormProps {
  client: Client
  cancel: () => void
  changeClient?: (cliente: Client) => void
}
export default function Form({ client, cancel, changeClient }: IFormProps) {
  const { message, closeSnackBar, openSnackBar, status } = useStatus()

  const initialValues = {
    id: client?.id,
    name: client?.name ?? '',
    age: client?.age ?? ''
  }

  const { values, handleChangeValue, handleSubmit, handleValidate, errors } = useFormValidation(initialValues)

  function handleSaveAndValidateClient() {
    // handleValidate(() => {
    //   const updatedErrors = {
    //     name: '',
    //     age: ''
    //   }
      
    //   if (values.name === '') {
    //     updatedErrors.name = 'Por favor, insira um nome válido'
    //   }
      
    //   if (values.age <= 0 || values.age >= 120 ) {
    //     updatedErrors.age = 'Por favor insira uma idade válida.'
    //   } 

    //   if (Object.values(updatedErrors).every(error => error === '')) changeClient?.(new Client(values.name, +values.age, values.id))
    
    //   return updatedErrors
    // })
    if (Object.values(errors).every(error => error === '')) changeClient?.(new Client(values.name, +values.age, values.id))
  }

  function nameFieldValidation(value: string) {
    const updatedErrors = errors

    if (value === '') {
      console.log('Inválido: ' + value)
      updatedErrors.name = 'Por favor, insira um nome válido.'
    } else {
      console.log('Válido: ' + value)
      updatedErrors.name = ''
    }

    return updatedErrors
  }

  function ageFieldValidation(value: number) {
    const updatedErrors = errors

    if (value <= 0 || value > 120){
      updatedErrors.age = 'Por favor, insira uma idade válida.'
      console.log('Inválido: ' + value)
    } else {
      console.log('Válido: ' + value)
      updatedErrors.age = ''
    }
  }

  return (
    <>
      <p className="text-black">{JSON.stringify(values)}</p>
      <p className="text-black">{JSON.stringify(errors)}</p>
      <SnackBar closeSnackBar={closeSnackBar} open={openSnackBar} type={status} message={message} />
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
        />
        <div className="flex justify-end mt-7">
          <Button
            type="submit"
            color="green"
            className="mr-2"
          >
            {values.id ? 'ALTERAR': 'SALVAR'}
          </Button>
          <Button onClick={cancel} color="gray">
            CANCELAR
          </Button>
        </div>
      </form>
    </>
  )
}