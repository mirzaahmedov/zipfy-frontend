import z from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { getErrorObject } from "@/utils/errors";
import { registerUserMutation } from "./queries";
import { ArrowRight } from "react-bootstrap-icons";
import TextField from "@/components/text-field";
import Button from "@/components/button";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

function Register() {
  const [errors, setErrors] = useState<Partial<z.infer<typeof formSchema>>>({});

  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { mutate: register, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUserMutation,
    onSuccess(result) {
      setUser(result.data);
      toast.success("Register success");
      navigate("/", { state: location.state });
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = formSchema.safeParse({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirm-password") as string,
    });

    if (!result.success) {
      setErrors(getErrorObject(result.error));
      toast.error("Invalid form data");
      return;
    }
    if (result.data.password !== result.data.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    register(result.data);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[600px] px-5 md:px-0 mx-auto mt-8 md:mt-16 mb-16 md:mb-20"
    >
      <h1 className="font-display font-bold text-[32px] md:text-[64px] text-center leading-[1.1]">
        <Decorate>Create</Decorate> Your Free Account
      </h1>
      <p className="mt-4 md:mt-8 text-sm md:text-xl text-gray-500 text-center leading-[1.6]">
        Sign up to start shortening links and manage your account.
      </p>
      <fieldset className="mt-8 md:mt-16">
        <TextField
          label="Name"
          errorMessage={errors.name}
          labelProps={{
            htmlFor: "name",
          }}
          inputProps={{
            type: "text",
            name: "name",
            id: "name",
            placeholder: "Your name",
          }}
        />
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
        <TextField
          label="Confirm password"
          errorMessage={errors.confirmPassword}
          labelProps={{
            htmlFor: "confirm-password",
          }}
          inputProps={{
            type: "password",
            name: "confirm-password",
            id: "confirm-password",
            placeholder: "Confirm your password",
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
        Create account
      </Button>
    </form>
  );
}

type DecorateProps = {
  children?: React.ReactNode;
};
function Decorate({ children }: DecorateProps) {
  return (
    <span className="relative">
      <svg
        width="138"
        height="54"
        viewBox="0 0 138 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-1.5 -left-[22px] right-0 md:hidden"
      >
        <path
          d="M1.0243 29.4435C21.7801 5.94059 127.548 1.88122 135.892 29.4435C144.512 57.9142 29.1802 60.3267 21.3223 34.1409C13.819 9.137 64.3196 -9.46993 113.196 9.36553"
          stroke="url(#paint0_linear_15_1207)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_15_1207"
            x1="59.8689"
            y1="57.4706"
            x2="99.471"
            y2="36.5068"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6B3BF5" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        width="265"
        height="101"
        viewBox="0 0 265 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-3 -left-[38px] right-0 hidden md:block"
      >
        <path
          d="M0.985727 55.0185C41.2235 9.45529 246.268 1.58569 262.445 55.0185C279.155 110.213 55.5695 114.89 40.3359 64.1251C25.79 15.6519 123.692 -20.42 218.445 16.095"
          stroke="url(#paint0_linear_14_252)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_14_252"
            x1="115.063"
            y1="109.353"
            x2="191.837"
            y2="68.7117"
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

export default Register;
