import type { ResponseType } from "@/types/response";
import type { URLType } from "@/types/url";
import axios from "axios";

export async function deleteURLMutation(id: string) {
  const { data } = await axios.delete<ResponseType<URLType>>(`/urls/${id}`);
  return data;
}
export async function updateURLMutation({
  id,
  url,
}: {
  id: string;
  url: string;
}) {
  const { data } = await axios.put<ResponseType<URLType>>(`/urls/${id}`, {
    url,
  });
  return data;
}
