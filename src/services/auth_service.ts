import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as repository from "../repositories/auth_repository"; 
import {prisma} from "../database/database"; 


export async function signUp(data:any) {
  const existingUser = await repository.findByEmail(data.email);
  if (existingUser) throw { type: "conflict", message: "Email already exists" };

  const hashedPassword = bcrypt.hashSync(data.password);
  await repository.create(data.name, data.email, hashedPassword);
}

export async function signIn(data: any) {
  const user = await repository.findByEmail(data.email);
  if (!user) throw { type: "not_found", message: "User not found" };

  const isPasswordValid = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordValid) throw { type: "unauthorized", message: "Invalid password" };

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret");
  return token;
}

export async function deleteUser(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw { type: "not_found", message: "Usuário não encontrado" };
  }

  await prisma.user.delete({
    where: { id: userId },
  });
}