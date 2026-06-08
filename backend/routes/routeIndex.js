import router from "express"

import createController from "../controllers/createController.js"
import loginController from "../controllers/loginController.js";
import deleteController from "../controllers/deleteController.js";

const routeIndex = router();

routeIndex.post("/create", createController.createAccount)
routeIndex.post("/login", loginController.loginAccount)
routeIndex.post("/remove", deleteController.deleteAccount)

export default routeIndex