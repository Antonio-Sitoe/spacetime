import { cookies } from "next/headers";
import decode from "jwt-decode";
interface Users {
  sub: string;
  name: string;
  avatarUrl: string;
}
export function getUsers(): Users {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("nao autenticado");
  }
  const user: Users = decode(token);
  return user;
}
