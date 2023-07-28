'use client'

import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Header from "@/components/Header";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import { useState } from "react";

export default function Home() {
  
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  const clientes = [
    new Cliente('Ana', 34, '1'),
    new Cliente('Bia', 45, '2'),
    new Cliente('Carlos', 23, '3'),
    new Cliente('Pedro', 54, '4')
  ]

  function novoCliente() {
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir ${cliente.nome}`)
  }

  function salvarCliente(cliente: Cliente) {
    console.log(cliente)
    setVisivel('tabela')
  }

  return (
    <>
      <Header titulo={'CADASTRO DE USUÁRIOS'} />
      <section className="px-8 py-4">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao
                onClick={novoCliente}
                className="mb-4"
                cor="purple"
              >
                + NOVO CLIENTE
              </Botao>
            </div>
            <Tabela clientes={clientes} clienteSelecionado={clienteSelecionado} clienteExcluido={clienteExcluido} />
          </>
        ) : (
          <Formulario cliente={cliente} cancelar={() => setVisivel('tabela')} clienteMudou={salvarCliente} />
        )}
      </section>
    </>
  )
}
