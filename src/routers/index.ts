import { Router } from "express";
import authRouter from "./auth_router";
import credentialRouter from "./credential_router";

const router = Router();


router.get("/health", (req, res) => res.status(200).send("I'm OK!"));


router.use(authRouter);
router.use(credentialRouter);

export default router;