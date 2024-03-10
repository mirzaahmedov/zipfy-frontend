import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import qrcode from "qrcode";

export type QRCodeProps = {
  url: string;
};
function QRCode({ url }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!url) {
      return;
    }
    console.log(url);
    qrcode
      .toCanvas(canvasRef.current, url, {
        width: 300,
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url]);
  return <canvas ref={canvasRef} className="mx-auto"></canvas>;
}

type QRCodePopoverProps = QRCodeProps & {
  onClose: () => void;
};
QRCode.Popover = function QRCodePopover({ url, onClose }: QRCodePopoverProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.getElementById("root")?.classList.add("blur");

    return () => {
      document.body.style.overflow = "";
      document.getElementById("root")?.classList.remove("blur");
    };
  }, [onClose]);

  const handleClickOutside = () => {
    onClose();
  };
  const handleClickInside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/10"
      onClick={handleClickOutside}
    >
      <div
        id="qrcode-popover"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center"
        onClick={handleClickInside}
      >
        <QRCode url={url} />
      </div>
    </div>,
    document.getElementById("modals") as HTMLElement,
  );
};

export default QRCode;
