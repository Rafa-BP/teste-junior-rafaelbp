import pool from "./pool.js";

async function createAccount(data) {
  await pool.query(
    "INSERT INTO barbearias VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      data["nomeBarbearia"],
      data["nomeResponsavel"],
      data["senha"],
      data["email"],
      data["telefone"],
      data["estado"],
      data["cidade"],
      data["numCadeiras"],
    ],
  );
}

async function getUserByName(nomeBarbearia) {
  const resultado = await pool.query(
    "SELECT * FROM barbearias WHERE nomeBarbearia = ($1)",
    [nomeBarbearia],
  );
  return resultado.rows[0];
}

async function deleteAccount(nomeBarbearia) {
  await pool.query("DELETE FROM barbearias WHERE nomeBarbearia = ($1)", [
    nomeBarbearia,
  ]);
}

export default {
  createAccount,
  getUserByName,
  deleteAccount,
};
