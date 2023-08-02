'use client'

import { useState } from "react";
import Field from "./Field";
import Client from "@/core/Client";
import Button from "./Button";

interface IFormProps {
  client: Client
  cancel: () => void
  changeClient?: (cliente: Client) => void
}

export default function Form({ client, cancel, changeClient }: IFormProps) {
  const id = client?.id
  const [name, setName] = useState(client?.name ?? '')
  const [age, setAge] = useState(client?.age ?? 0)

  return (
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
      <Field
        text="Idade"
        type="number"
        value={age}
        onChange={setAge}
      />
      <div className="flex justify-end mt-7">
        <Button
          onClick={() => changeClient?.(new Client(name, +age, id))}
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
  )
}