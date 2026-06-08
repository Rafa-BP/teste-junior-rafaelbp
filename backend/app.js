import express from "express"
import cors from "cors"

import routeIndex from "./routes/routeIndex.js";

const app = express();
app.use(cors());

app.use(express.urlencoded({extended: true}));

app.use("/", routeIndex);

app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    }
})