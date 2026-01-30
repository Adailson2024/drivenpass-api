import { Router } from "express";
import { validateSchema } from "../midllewares/schema_validation";
import { validateToken } from "../midllewares/auth_midlleware"; 
import { credentialSchema } from "../schemas/schema";
import * as controller from "../controllers/credential_controller";

const credentialRouter = Router();


credentialRouter.use(validateToken); 

credentialRouter.post("/credentials", validateSchema(credentialSchema), controller.create);
credentialRouter.get("/credentials", controller.getAll);
credentialRouter.get("/credentials/:id", controller.getById);
credentialRouter.put("/credentials/:id", validateSchema(credentialSchema), controller.update);
credentialRouter.delete("/credentials/:id", controller.deleteById);


export default credentialRouter;