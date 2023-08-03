'use client'

import { useState } from "react";
import Field from "./Field";
import Client from "@/core/Client";
import Button from "./Button";
import SnackBar from "./SnackBar";
import useStatus from "@/hooks/useStatus";

interface IFormProps {
  client: Client
  cancel: () => void
  changeClient?: (cliente: Client) => void
}

interface IFormErrorFields {
  name: boolean
  age: boolean
}

interface IFormMessageFields {
  name: string
  age: string
}

export default function Form({ client, cancel, changeClient }: IFormProps) {
  const id = client?.id
  const [name, setName] = useState(client?.name ?? '')
  const [age, setAge] = useState(0)
  const [formError, setFormError] = useState<IFormErrorFields>({
    name: false,
    age: false
  })
  const [formMessage, setFormMessage] = useState<IFormMessageFields>({
    name: '',
    age: ''
  })
  
  const { message, closeSnackBar, openSnackBar, status } = useStatus()

  function handleSaveClient() {
    if (name === '') {
      setFormError(prevStatus => ({
        ...prevStatus,
        name: true,
      }))
      setFormMessage(prevStatus => ({
        ...prevStatus,
        name: 'O preenchimento deste campo é obrigatório.',
      }))
      return
    }

    if (age <= 0 || age > 120 ) {
      setFormError(prevStatus => ({
        ...prevStatus,
        age: true,
      }))
      setFormMessage(prevStatus => ({
        ...prevStatus,
        age: 'A idade deve ser maior que 0 e menor que 120.',
      }))
      return
    }

    changeClient?.(new Client(name, +age, id))
  }

  return (
    <>
      <SnackBar closeSnackBar={closeSnackBar} open={openSnackBar} type={status} message={message} />
      <form>
        {id && (
          <Field
            text="Código"
            value={id}
            type="text"
            readOnly={true}
          />
        )}
        <Field
          text="Nome"
          type="text"
          value={name}
          onChange={setName}
        />
        {formError.name && <p className="text-red-600">{formMessage.name}</p>}
        <Field
          text="Idade"
          type="number"
          value={age}
          onChange={setAge}
        />
        {formError.age && <p className="text-red-600">{formMessage.age}</p>}
        <div className="flex justify-end mt-7">
          <Button
            onClick={handleSaveClient}
            color="green"
            className="mr-2"
          >
            {id ? 'ALTERAR': 'SALVAR'}
          </Button>
          <Button onClick={cancel} color="gray">
            CANCELAR
          </Button>
        </div>
      </form>
    </>
  )
}