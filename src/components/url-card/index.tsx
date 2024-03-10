import type { URLType } from "@/types/url";
import { useCallback, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { deleteURLMutation, updateURLMutation } from "./queries";
import { QrCodeScan, Trash, Pencil } from "react-bootstrap-icons";
import CopyBtn from "@/components/copy-btn";
import QRCode from "@/components/qrcode";

type URLCardProps = {
  url: URLType;
};

function URLCard({ url }: URLCardProps) {
  const { id, short, url: original } = url;

  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);

  const { mutate: deleteURL, isPending: isPendingDelete } = useMutation({
    mutationKey: ["deleteURL"],
    mutationFn: deleteURLMutation,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      toast.success("URL deleted");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to delete URL");
    },
  });
  const { mutate: updateURL, isPending: isPendingUpdate } = useMutation({
    mutationKey: ["updateURL"],
    mutationFn: updateURLMutation,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      toast.success("URL updated");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to update URL");
    },
  });

  const handleUpdateURL = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newURL = formData.get("destination") as string;

    updateURL({ id, url: newURL });
  };
  const handleQRCodeClose = useCallback(() => {
    setIsQRCodeVisible(false);
  }, []);

  return (
    <div
      className={twMerge(
        "mt-8",
        editing && "bg-white p-4 md:p-8 flex flex-col gap-8 rounded-2xl",
      )}
    >
      <div className="flex items-center flex-wrap">
        <div className="flex-1">
          <a href={short} className="block text-base md:text-2xl font-medium">
            {short}
          </a>
          <a
            href={original}
            className="mt-2 block text-sm md:text-base text-gray-700"
          >
            {original}
          </a>
        </div>
        <div className="mt-4 md:mt-0 flex flex-shrink-0 gap-4">
          <button
            className="icon-btn"
            onClick={() => setIsQRCodeVisible((prev) => !prev)}
          >
            <QrCodeScan />
          </button>
          <button
            disabled={isPendingDelete}
            className="icon-btn"
            onClick={() => deleteURL(id)}
          >
            <Trash className="text-red-500" />
          </button>
          <button
            className="icon-btn"
            onClick={() => setEditing((prev) => !prev)}
          >
            <Pencil />
          </button>
          <CopyBtn value={short} />
        </div>
      </div>
      {editing ? (
        <form onSubmit={handleUpdateURL}>
          <label htmlFor="destination" className="block text-gray-700">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            id="destination"
            defaultValue={original}
            placeholder="https://example.org"
            className="block w-full mt-2 bg-gray-50 px-6 py-3 rounded-lg"
          />
          <button
            disabled={isPendingUpdate || isPendingDelete}
            type="submit"
            className="block ml-auto mt-8 text-white bg-primary px-4 py-2 rounded-full"
          >
            # Save
          </button>
        </form>
      ) : null}
      {isQRCodeVisible ? (
        <QRCode.Popover url={short} onClose={handleQRCodeClose} />
      ) : null}
    </div>
  );
}

export default URLCard;
