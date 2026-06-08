import queries from "../db/queries.js";

export async function validateCreate(req, res) {
  for (const key in req.body) {
    if (req.body[key].length < 1) {
      res.json({
        status: "error",
        usuario: req.body,
        message: "Preencha todos os campos do formulario corretamente.",
      });
      return false
    }
  }
  const exists = await queries.getUserByName(req.body["nomebarbearia"])
  if (exists) {
      res.json({
      status: "error",
      usuario: req.body,
      message: "Conta ja cadastrada para esta barbearia.",
    });
    return false
  }
  if (req.body["senha"].length < 8) {
    res.json({
      status: "error",
      usuario: req.body,
      message: "A senha precisa ter no minimo 8 caracteres.",
    });
    return false
  }
  if (req.body["numcadeiras"] < 1) {
    res.json({
      status: "error",
      usuario: req.body,
      message: "O numero de cadeiras tem que ser ao minimo 1.",
    });
    return false
  } 

  return true
}