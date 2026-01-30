import { Request, Response } from "express";
import * as service from "../services/credential_service";

export async function create(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const credentialData = req.body;

  await service.createCredential(userId, credentialData);
  res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const credentials = await service.getUserCredentials(userId);
  res.status(200).send(credentials);
}

export async function deleteById(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const id = parseInt(req.params.id as string);

  if (isNaN(id) || id <= 0) return res.status(400).send("Invalid ID");

  await service.deleteCredential(userId, id);
  res.sendStatus(204);
}

export async function update(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const id = parseInt(req.params.id as string);
  const data = req.body;

  if (isNaN(id) || id <= 0) return res.status(400).send("Invalid ID");

  await service.updateCredential(userId, id, data);
  res.sendStatus(200);
}

export async function getById(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const id = parseInt(req.params.id as string);
  const credential = await service.getCredentialById(userId, id);
  res.status(200).send(credential);
}