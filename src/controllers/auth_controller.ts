import { Request, Response } from "express";
import * as service from "../services/auth_service";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  await service.signUp({ name, email, password });
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await service.signIn({ email, password });
  res.status(200).send({ token });
}

export async function deleteAccount(req: Request, res: Response) {
  const { userId } = res.locals.user;
  await service.deleteUser(userId);
  res.sendStatus(204);
}

