import {prisma} from "../database/database";
export async function findByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function create(name: string, email: string, password: string) {
  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id },
  });
}