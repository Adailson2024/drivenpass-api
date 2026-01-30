import express, { json } from "express";
import "express-async-errors";
import router from "./routers";
import {errorHandler} from "./midllewares/error_handler";

const app = express();
app.use(json());
app.use(router);
app.use(errorHandler); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});