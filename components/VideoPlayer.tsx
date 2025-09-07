import React from "react";

type Props = {
  provider: "youtube" | "vimeo";
  videoId: string;
};

export default function VideoPlayer({ provider, videoId }: Props) {
  const src = provider === "youtube"
    ? `https://www.youtube.com/embed/${videoId}`
    : `https://player.vimeo.com/video/${videoId}`;
  return (
    <div className="aspect-video w-full rounded overflow-hidden bg-black">
      <iframe
        src={src}
        title="Video player"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}
