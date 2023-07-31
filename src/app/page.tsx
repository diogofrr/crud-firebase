'use client'

import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Header from "@/components/Header";
import Tabela from "@/components/Tabela";
import useClientes from "@/hooks/useClientes";


export default function Home() {
  const {
    cliente,
    clientes,
    salvarCliente, 
    excluirCliente, 
    selecionarCliente, 
    novoCliente,
    tabelaVisivel,
    exibirTabela
  } = useClientes()

  return (
    <>
      <Header titulo={'CADASTRO DE USUÁRIOS'} />
      <section className="px-8 py-4">
        {tabelaVisivel ? (
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
            <Tabela clientes={clientes} clienteSelecionado={selecionarCliente} clienteExcluido={excluirCliente} />
          </>
        ) : (
          <Formulario cliente={cliente} cancelar={exibirTabela} clienteMudou={salvarCliente} />
        )}
      </section>
    </>
  )
}
