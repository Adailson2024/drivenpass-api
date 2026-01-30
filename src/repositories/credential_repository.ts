import {prisma} from "../database/database.js"; 
export type CreateCredentialData = {
  userId: number;
  title: string;
  url: string;
  username: string;
  password: string;
};

export async function findByTitle(userId: number, title: string) {
  // O Prisma usa findFirst para buscar por critérios que não são a Chave Primária única
  return await prisma.credential.findFirst({
    where: { 
      userId, 
      title 
    },
  });
}

export async function insert(data: any) { // Substitua 'any' pelo seu tipo CreateCredentialData
  // O Prisma retorna o objeto criado automaticamente
  return await prisma.credential.create({
    data: data,
  });
}

export async function findAllByUserId(userId: number) {
  // findMany retorna um array (equivalente ao result.rows)
  return await prisma.credential.findMany({
    where: { userId },
  });
}

export async function findById(id: number) {
  return await prisma.credential.findUnique({
    where: { id },
  });
}

export async function update(id: number, data: any) {
  // O Prisma ignora campos 'undefined' automaticamente, agindo como o COALESCE do SQL
  return await prisma.credential.update({
    where: { id },
    data: data,
  });
}

export async function remove(id: number) {
  return await prisma.credential.delete({
    where: { id },
  });
}