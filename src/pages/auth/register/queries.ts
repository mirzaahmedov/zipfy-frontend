import type { ResponseType } from "@/types/response";
import type { UserType } from "@/types/user";
import axios from "axios";

export async function registerUserMutation({
  name,
  email,
  password,
}: Pick<UserType, "name" | "email"> & { password: string }) {
  const { data } = await axios.post<ResponseType<UserType>>("/auth/register", {
    name,
    email,
    password,
  });
  return data;
}
