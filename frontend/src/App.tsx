import { useState } from "react";
import "./App.css";

import FormCreate from "../components/FormCreate.tsx";
import FormLogin from "../components/FormLogin.tsx";

import type { User } from "../types/interfaces.ts";

function App() {
  const [logar, setLogar] = useState<boolean>(true);
  const [info, setInfo] = useState<User | null>(null);

  function handleMudarForm(): void {
    setLogar(!logar);
  }

  function handleSairConta(): void {
    setInfo(null);
  }

  function handleMudarInfo(User: User): void {
    setInfo(User);
  }

  async function handleRemoverCadastro() {
    try {
      const infoRem = new URLSearchParams(info as any);

      const response = await fetch("http://localhost:3000/remove", {
        method: "post",
        body: infoRem,
      });
      if (!response.ok) {
        throw new Error("Erro do servidor.");
      }
      const data = await response.json();
      console.log(data);

      if (data["status"] != "ok") {
        throw new Error("Erro ao remover conta.");
      }

      setInfo(null);
    } catch (error) {
      console.log(error);
    }
  }

  if (!info)
    return (
      <main className="container">
        <img
          src="../public/imagemBarbearia.jpg"
          alt="Imagem do interior de uma barbearia."
          id="imagemPrincipal"
        />
        <aside id="container-aside">
          {logar ? (
            <>
              <FormCreate onChange={handleMudarInfo} />
              <p>Já tem cadastro?</p>
            </>
          ) : (
            <>
              <FormLogin onChange={handleMudarInfo} />
              <p>Não tem cadastro?</p>
            </>
          )}
          <button onClick={handleMudarForm} className="botaoSecundario">
            {logar ? "Entrar na conta" : "Cadastrar barbearia"}
          </button>
        </aside>
      </main>
    );
  return (
    <>
      <main className="container-col">
        <h2>{info["nomebarbearia"]}</h2>
        <p>Responsavel: {info["nomeresponsavel"]}</p>
        <div className="container">
          <button onClick={handleSairConta} className="botaoSecundario">Encerrar Sessão</button>
          <button onClick={handleRemoverCadastro} className="botaoSecundario">Remover Cadastro</button>
        </div>
      </main>
    </>
  );
}

export default App;
