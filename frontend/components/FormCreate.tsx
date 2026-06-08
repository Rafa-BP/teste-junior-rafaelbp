import { useRef, useState } from "react";
import type { User } from "../types/interfaces";

function FormCreate({onChange}: {onChange: (User: User) => void}) {
  const [mensagem, setMensagem] = useState<string>("");

  const formulario = useRef<HTMLFormElement>(null);

  async function handleCriar() {
    const formData = new URLSearchParams(
      new FormData(formulario.current!) as any,
    );

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "post",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Erro do servidor.");
      }
      const data = await response.json();

      if (data["status"] != "ok") {
        setMensagem(data["message"])
        throw new Error("Erro ao criar conta.");
      }

      onChange(data.usuario);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Cadastre sua barbearia!</h1>
      <form action="" method="POST" ref={formulario} id="container-form">
        <div className="container-col" id="nomeBarGrid">
          <label htmlFor="nomeBarbearia">Nome da Barbearia: </label>
          <input type="text" name="nomebarbearia" id="nomeBarbearia"/>
        </div>

        <div className="container-col" id="nomeRespGrid">
          <label htmlFor="nomeResponsavel">Nome do(a) Responsavel: </label>
          <input type="text" name="nomeresponsavel" id="nomeResponsavel"/>
        </div>

        <div className="container-col" id="senhaGrid">
          <label htmlFor="senha">Senha: </label>
          <input type="text" name="senha" id="senha"/>
        </div>

        <div className="container-col" id="emailGrid">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email"/>
        </div>

        <div className="container-col" id="telefoneGrid">
          <label htmlFor="telefone">Telefone: </label>
          <input type="telephone" name="telefone" id="telefone"/>
        </div>

        <div className="container-col" id="estadoGrid">
          <label htmlFor="estado">Estado: </label>
          <input type="text" name="estado" id="estado"/>
        </div>

        <div className="container-col" id="cidadeGrid">
          <label htmlFor="cidade">Cidade: </label>
          <input type="text" name="cidade" id="cidade"/>
        </div>

        <div className="container-col" id="numCadeirasGrid">
          <label htmlFor="numCadeiras">Num. Cadeiras: </label>
          <input type="number" name="numcadeiras" id="numCadeiras"/>
        </div>
      </form>
      <p id="mensagemErro">{mensagem}</p>
      <button onClick={handleCriar} className="botaoPrincipal">
        Cadastrar Barbearia
      </button>
    </>
  );
}

export default FormCreate;
