import { Router } from "express";
import { signUp, signIn } from "../controllers/auth_controller";
import { validateSchema } from "../midllewares/schema_validation";
import { loginSchema, signUpSchema } from "../schemas/schema";

const authRouter = Router();


authRouter.post("/signup", validateSchema(signUpSchema), signUp);


authRouter.post("/signin", validateSchema(loginSchema), signIn);

export default authRouter;