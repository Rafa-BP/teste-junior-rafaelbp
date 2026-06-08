import queries from "../db/queries.js";

async function deleteAccount(req, res) {
  console.log(req.body);
  try {
    await queries.deleteAccount(req.body["nomebarbearia"]);
    res.json({ status: "ok", usuario: req.body });
  } catch (error) {
    res.json({ status: "error", usuario: req.body, message: error });
  }
}

export default {
  deleteAccount,
};
