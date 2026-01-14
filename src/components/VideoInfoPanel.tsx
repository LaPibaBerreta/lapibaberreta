import type { VideosQueryResult } from "../lib/types";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import { X } from "lucide-react";

export default function VideoInfoPanel({
  video,
  handleClose,
}: {
  video: VideosQueryResult[number];
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { language } = useLanguage();

  return (
    <div className="fixed inset-0 z-200 flex h-screen w-full flex-col items-center justify-center bg-black text-white">
      <h1 className="text-xl underline">{video.title?.es}</h1>
      <p className="mb-4">{video.date ?? video.date}</p>

      {video.text?.es && (
        <p className="flex max-w-prose flex-col gap-2">
          <PortableText value={video.text[language] || video.text.es} />
        </p>
      )}
      <button onClick={handleClose} className="cursor-pointer">
        <X />
      </button>
    </div>
  );
}
