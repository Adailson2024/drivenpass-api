import * as repository from "../repositories/credential_repository.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr(String(process.env.CRYPTR_SECRET) || "default_secret");

export async function createCredential(userId: number, data: any) {
  const existing = await repository.findByTitle(userId, data.title);
  if (existing) throw { type: "conflict", message: "Title already in use for this user" };

  
  const encryptedPassword = cryptr.encrypt(data.password);
  
  await repository.insert({ 
    ...data, 
    password: encryptedPassword, 
    userId 
  });
}

export async function getUserCredentials(userId: number) {
  const credentials = await repository.findAllByUserId(userId);
  
  return credentials.map(c => ({
    ...c,
    password: cryptr.decrypt(c.password)
  }));
}

export async function getCredentialById(userId: number, credentialId: number) {
  const credential = await repository.findById(credentialId);

  if (!credential) throw { type: "not_found", message: "Credential not found" };
  if (credential.userId !== userId) throw { type: "unauthorized", message: "This credential does not belong to you" };

  return {
    ...credential,
    password: cryptr.decrypt(credential.password)
  };
}

export async function deleteCredential(userId: number, credentialId: number) {
  const credential = await repository.findById(credentialId);

  if (!credential) throw { type: "not_found", message: "Credential not found" };
  if (credential.userId !== userId) throw { type: "unauthorized", message: "Not your credential" };

  await repository.remove(credentialId);
}

export async function updateCredential(userId: number, credentialId: number, data: any) {
  const credential = await repository.findById(credentialId);

  if (!credential) throw { type: "not_found", message: "Credential not found" };
  if (credential.userId !== userId) throw { type: "unauthorized", message: "Not your credential" };

  
  if (data.title && data.title !== credential.title) {
    const existing = await repository.findByTitle(userId, data.title);
    if (existing) throw { type: "conflict", message: "New title already in use" };
  }

  
  if (data.password) {
    data.password = cryptr.encrypt(data.password);
  }

  await repository.update(credentialId, data);
}