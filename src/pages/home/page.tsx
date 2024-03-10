import type { URLType } from "@/types/url";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createURLMutation, getURLsQuery } from "./queries";
import { Link45deg } from "react-bootstrap-icons";
import Button from "@/components/button";
import Result from "./result";
import URLCard from "@/components/url-card";

function Home() {
  const mounted = useRef(false);

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [result, setResult] = useState<URLType | null>(null);

  const { data: urls } = useQuery({
    queryKey: ["urls"],
    queryFn: getURLsQuery,
    enabled: Boolean(user),
  });
  const { mutate: createURL, isPending } = useMutation({
    mutationKey: ["createURL"],
    mutationFn: createURLMutation,
    onSuccess(result) {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      setResult(result.data);
      toast.success("URL shortened successfully");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to shorten URL");
    },
  });

  console.log("isPending", isPending);

  useEffect(() => {
    if (!user || mounted.current || !location.state || !location.state.url) {
      return;
    }

    mounted.current = true;

    let url = location.state.url;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    navigate("/", { replace: true });
    setTimeout(() => {
      createURL(url);
    }, 0);
  }, [user, navigate, createURL, location.state]);

  const handleCreateURL = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;

    if (!user) {
      navigate("/auth/login", { state: { url: url } });
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      createURL("https://" + url);
      return;
    }

    createURL(url);
  };
  return (
    <div className="my-16 md:my-20 mx-auto px-5 md:px-0 max-w-[600px]">
      <h1 className="font-display font-bold text-[32px] md:text-[64px] text-center leading-[1.1]">
        <Decorate>Short</Decorate>en Your <i className="underline">Links</i>,
        Share with the{" "}
        <span className="bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent">
          World!
        </span>
      </h1>
      <p className="mt-4 md:mt-8 text-sm md:text-xl text-gray-500 text-center leading-[1.6]">
        Make long URLs manageable and shareable with our free URL shortener.
        Simple, fast, and reliable.
      </p>
      <form onSubmit={handleCreateURL} className="relative mt-8 md:mt-16">
        <input
          type="text"
          name="url"
          id="url"
          placeholder="https://example.org"
          className="w-full px-6 md:px-8 py-5 md:py-[26px] rounded-full text-base shadow-neutral-base hover:shadow-neutral-md transition focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          iconBefore={<Link45deg className="text-xl" />}
          className="primary-btn absolute py-5 top-1 right-1 md:top-1.5 md:right-1.5"
        >
          Shorten
        </Button>
      </form>
      {result ? <Result url={result} /> : null}
      <div className="mt-16 md:mt-20">
        {user && Array.isArray(urls?.data) && urls.data.length > 0 ? (
          <>
            <h5 className="text-xl md:text-3xl font-medium">History</h5>
            <div>
              {urls.data.map((u) => (
                <URLCard key={u.id} url={u} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-8 md:mt-16">
            No shortened URLs yet
          </p>
        )}
      </div>
    </div>
  );
}
type DecorateProps = {
  children?: React.ReactNode;
};
function Decorate({ children }: DecorateProps) {
  return (
    <span className="inline-block relative">
      <svg
        width="101"
        height="49"
        viewBox="0 0 101 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-2.5 -top-2 md:hidden"
      >
        <path
          d="M1.40367 20.4442C19.7546 -2.72316 93.6212 -8.10059 99.7121 20.4442C106.004 49.9299 7.13136 58.8809 1.40369 31.7645C-4.06546 5.87212 47.1463 -8.19279 87.7805 13.1317"
          stroke="url(#paint0_linear_15_927)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_15_927"
            x1="43.24"
            y1="51.8048"
            x2="75.0112"
            y2="39.6895"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6B3BF5" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        width="192"
        height="92"
        viewBox="0 0 192 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-2.5 -top-4 hidden md:block"
      >
        <path
          d="M2.75687 37.9289C37.7569 -6.07111 178.64 -16.2841 190.257 37.9289C202.257 93.9289 13.6811 110.929 2.7569 59.4288C-7.67419 10.2533 90 -16.4592 167.5 24.0408"
          stroke="url(#paint0_linear_8_283)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_8_283"
            x1="82.5497"
            y1="97.4897"
            x2="143.08"
            y2="74.3099"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6B3BF5" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      {children}
    </span>
  );
}

export default Home;
