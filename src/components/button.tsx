export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  iconBefore?: React.ReactNode;
};

function Button({ children, isLoading, iconBefore, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {isLoading ? <Loading /> : iconBefore} {children}
    </button>
  );
}

function Loading() {
  return (
    <span className="w-[1em] h-[1em] border-r border-[currentColor] rounded-full animate-spin"></span>
  );
}

export default Button;
