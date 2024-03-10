import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const navLinks = [
  {
    label: "Register",
    href: "/auth/register",
  },
  {
    label: "Login",
    href: "/auth/login",
  },
];

function AuthLayout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <nav className="mt-16 md:mt-20 flex items-center justify-center gap-8 md:gap-16 text-base md:text-xl uppercase font-medium">
        {navLinks.map(({ href, label }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              twMerge(
                "px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100",
                isActive &&
                  "bg-gradient-to-r from-secondary to-primary text-white",
              )
            }
            state={location.state}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}

export default AuthLayout;
