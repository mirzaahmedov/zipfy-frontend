import type { ResponseType } from "@/types/response";
import type { URLType } from "@/types/url";
import axios from "axios";

export async function getURLsQuery() {
  const { data } = await axios.get<ResponseType<URLType[]>>("/urls");
  return data;
}
export async function createURLMutation(url: string) {
  const { data } = await axios.post<ResponseType<URLType>>("/urls", { url });
  return data;
}
