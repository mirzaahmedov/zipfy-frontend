import type { URLType } from "@/types/url";
import QRCode from "@/components/qrcode";
import CopyBtn from "@/components/copy-btn";

export type ResultProps = {
  url: URLType;
};
function Result({ url }: ResultProps) {
  const { url: original, short } = url;
  return (
    <div className="mt-16 md:mt-20">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <a href={short} className="block text-xl md:text-4xl font-medium">
            {short}
          </a>
          <a
            href={original}
            className="mt-2 block text-sm md:text-base text-gray-700"
          >
            {original}
          </a>
        </div>
        <CopyBtn value={short} />
      </div>
      <div className="mt-8">
        <QRCode url={short} />
      </div>
    </div>
  );
}

export default Result;
