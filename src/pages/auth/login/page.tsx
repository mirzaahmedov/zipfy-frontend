import z from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { loginUserMutation } from "./queries";
import { getErrorObject } from "@/utils/errors";
import { ArrowRight } from "react-bootstrap-icons";
import TextField from "@/components/text-field";
import Button from "@/components/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormType = z.infer<typeof formSchema>;

function Login() {
  const [errors, setErrors] = useState<Partial<FormType>>({});

  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { mutate: login, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUserMutation,
    onSuccess(result) {
      setUser(result.data);
      toast.success("Login success");
      navigate("/", { state: location.state });
    },
    onError(error) {
      console.error(error);
      toast.error("Login failed");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = formSchema.safeParse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (!result.success) {
      setErrors(getErrorObject(result.error));
      toast.error("Invalid form data");
      return;
    }

    login(result.data);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[600px] px-5 md:px-0 mx-auto mt-8 md:mt-16 mb-16 md:mb-20"
    >
      <h1 className="font-display font-bold text-[32px] md:text-[64px] text-center leading-[1.1]">
        <Decorate>Welcome</Decorate> Back!
      </h1>
      <p className="mt-4 md:mt-8 text-sm md:text-xl text-gray-500 text-center leading-[1.6]">
        Sign in to your account to access your shortened links.
      </p>
      <fieldset className="mt-8 md:mt-16">
        <TextField
          label="Email"
          errorMessage={errors.email}
          labelProps={{
            htmlFor: "email",
          }}
          inputProps={{
            type: "text",
            name: "email",
            id: "email",
            placeholder: "Your email",
          }}
        />
        <TextField
          label="Password"
          errorMessage={errors.password}
          labelProps={{
            htmlFor: "password",
          }}
          inputProps={{
            type: "password",
            name: "password",
            id: "password",
            placeholder: "Your password",
          }}
        />
      </fieldset>
      <Button
        type="submit"
        disabled={isPending}
        isLoading={isPending}
        iconBefore={<ArrowRight className="text-xl" />}
        className="mt-8 md:mt-16 mx-auto primary-btn"
      >
        Continue
      </Button>
    </form>
  );
}
type DecorateProps = {
  children?: React.ReactNode;
};
function Decorate({ children }: DecorateProps) {
  return (
    <span className="inline-block relative">
      <svg
        width="198"
        height="56"
        viewBox="0 0 198 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-9 -top-3.5 md:hidden"
      >
        <path
          d="M1.05777 29.7398C22.4918 5.46901 187.943 3.6642 196.56 32.127C205.462 61.5281 30.1337 61.6322 22.019 34.5907C14.2706 8.76986 66.4212 -10.4451 116.895 9.00586"
          stroke="url(#paint0_linear_15_1304)"
          stroke-width="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_15_1304"
            x1="85.8"
            y1="60.4724"
            x2="135.464"
            y2="25.8078"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#6B3BF5" />
            <stop offset="1" stop-color="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        width="370"
        height="103"
        viewBox="0 0 370 103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-12 -top-6 hidden md:block"
      >
        <path
          d="M0.985727 55.0185C41.2235 9.45529 351.823 6.06715 368 59.5C384.71 114.694 55.5695 114.89 40.3359 64.1251C25.79 15.6519 123.692 -20.42 218.445 16.095"
          stroke="url(#paint0_linear_14_263)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_14_263"
            x1="160.071"
            y1="112.712"
            x2="253.304"
            y2="47.6371"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#6B3BF5" />
            <stop offset="1" stop-color="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      {children}
    </span>
  );
}

export default Login;
