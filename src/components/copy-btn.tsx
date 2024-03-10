import { useState } from "react";
import { ClipboardPlus, ClipboardCheck } from "react-bootstrap-icons";
import { twMerge } from "tailwind-merge";

type CopyBtnProps = {
  value: string;
};
function CopyBtn({ value }: CopyBtnProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  };
  return (
    <button
      className={twMerge(
        "flex items-center px-4 py-2 gap-2 text-gray-700 bg-gray-100 active:bg-gray-200 hover:outline-none hover:ring-2 hover:ring-gray-300 transition rounded-full",
        copied &&
          "bg-green-100 text-green-700 hover:ring-green-300 active:bg-green-200",
      )}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <ClipboardCheck /> Copied!
        </>
      ) : (
        <>
          <ClipboardPlus /> Copy
        </>
      )}
    </button>
  );
}

export default CopyBtn;
