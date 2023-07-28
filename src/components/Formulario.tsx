'use client'

import { useState } from "react";
import Entrada from "./Entrada";
import Cliente from "@/core/Cliente";
import Botao from "./Botao";

interface IFormularioProps {
  cliente: Cliente
  cancelar: () => void
  clienteMudou?: (cliente: Cliente) => void
}

export default function Formulario({ cliente, cancelar, clienteMudou }: IFormularioProps) {
  const id = cliente?.id
  const [nome, setNome] = useState(cliente?.nome ?? '')
  const [idade, setIdade] = useState(cliente?.idade ?? 0)

  return (
    <form>
      {id && (
        <Entrada
          texto="Código"
          valor={id}
          tipo="text"
          somenteLeitura={true}
        />
      )}
      <Entrada
        texto="Nome"
        tipo="text"
        valor={nome}
        valorMudou={setNome}
      />
      <Entrada
        texto="Idade"
        tipo="number"
        valor={idade}
        valorMudou={setIdade}
      />
      <div className="flex justify-end mt-7">
        <Botao
          onClick={() => clienteMudou?.(new Cliente(nome, +idade, id))}
          cor="green"
          className="mr-2"
        >
          {id ? 'ALTERAR': 'SALVAR'}
        </Botao>
        <Botao onClick={cancelar} cor="gray">
          CANCELAR
        </Botao>
      </div>
    </form>
  )
}