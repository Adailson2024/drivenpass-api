import * as repository from "../repositories/credential_repository";

export async function createCredential(userId: number, data: any) {
  const existing = await repository.findByTitle(userId, data.title);
  if (existing) throw { type: "conflict", message: "Title already in use" };

  await repository.insert({ ...data, userId });
}

export async function getUserCredentials(userId: number) {
  return await repository.findAllByUserId(userId);
}

export async function deleteCredential(userId: number, credentialId: number) {
  // 1. Verificamos se a credencial existe e pertence ao usuário
  const credential = await repository.findById(credentialId);

  if (!credential) {
    throw { type: "not_found", message: "Credential not found" };
  }

  if (credential.userId !== userId) {
    throw { type: "unauthorized", message: "This credential does not belong to you" };
  }

  // 2. Deletamos
  await repository.remove(credentialId);
}

export async function updateCredential(userId: number, credentialId: number, data: repository.CreateCredentialData) {
  // 1. Verificamos se a credencial existe e pertence ao usuário
  const credential = await repository.findById(credentialId);

  if (!credential) {
    throw { type: "not_found", message: "Credential not found" };
  }

  if (credential.userId !== userId) {
    throw { type: "unauthorized", message: "This credential does not belong to you" };
  }

  
  await repository.update(credentialId, data);
}