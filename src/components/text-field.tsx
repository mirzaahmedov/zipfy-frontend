import { twMerge } from "tailwind-merge";

export type TextFieldProps = {
  label: string;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
};
function TextField({
  label,
  labelProps,
  inputProps,
  errorMessage,
}: TextFieldProps) {
  return (
    <>
      <label
        {...labelProps}
        className={twMerge("mt-8 first:mt-0 field-label", labelProps.className)}
      >
        {label}
      </label>
      <input
        {...inputProps}
        className={twMerge("mt-2 field-input", inputProps.className)}
      />
      {errorMessage ? (
        <span className="block mt-2 text-red-400">{errorMessage}</span>
      ) : null}
    </>
  );
}
export default TextField;
