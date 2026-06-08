import queries from "../db/queries.js";
import bcrypt from "bcryptjs";

import { validateCreate } from "./validateCredentials.js";

const salt = bcrypt.genSaltSync(10);

async function createAccount(req, res) {
  const valido = await validateCreate(req, res)
  console.log(valido)
  if (valido) {
    const hash = bcrypt.hashSync(req.body["senha"], salt);
    try {
      await queries.createAccount({ ...req.body, senha: hash });
      res.json({ status: "ok", usuario: req.body });
    } catch (error) {
      res.json({ status: "error", usuario: req.body, message: error });
    }
  }
}

export default {
  createAccount,
};
