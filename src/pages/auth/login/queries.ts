import type { ResponseType } from "@/types/response";
import type { UserType } from "@/types/user";
import axios from "axios";

export async function loginUserMutation({
  email,
  password,
}: Pick<UserType, "email"> & { password: string }) {
  const { data } = await axios.post<ResponseType<UserType>>("/auth/login", {
    email,
    password,
  });
  return data;
}
