import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { Link } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import Avatar from "@/components/avatar";

async function logoutMutation() {
  const { data } = await axios.get("/auth/logout");
  return data;
}

export type HeaderProps = {
  withProfile?: boolean;
};
function Header({ withProfile }: HeaderProps) {
  const { user, setUser } = useAuth();
  const { mutate: logout, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutMutation,
    onSuccess() {
      toast.success("Logged out successfully");
      setUser(null);
    },
  });
  return (
    <div className="px-5 py-5 md:px-20 md:py-10 flex items-center justify-between">
      <Link to="/">
        <h1 className="font-brand bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent text-5xl">
          Zipfy
        </h1>
      </Link>
      {withProfile && user && (
        <div className="flex gap-4 items-center">
          <h6 className="hidden md:block font-bold">{user.name}</h6>
          <Avatar src={""} alt={user.name} />
          <button
            disabled={isPending}
            onClick={() => logout()}
            className="icon-btn !p-4"
          >
            <BoxArrowRight className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
