import type { ResponseType } from "@/types/response";
import type { UserType } from "@/types/user";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@/features/auth";
import Header from "./header";
import Footer from "./footer";

function MainLayout() {
  const { setUser } = useAuth();

  const { data: result } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get<ResponseType<UserType>>("/auth/check");
      return data;
    },
  });

  useEffect(() => {
    setUser(result?.data || null);
  }, [result, setUser]);

  return (
    <>
      <Header withProfile />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
