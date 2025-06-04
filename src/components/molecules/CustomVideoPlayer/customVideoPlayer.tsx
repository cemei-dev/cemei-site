import { useRef, useState, useEffect } from "react";

import { Play, X } from "lucide-react";

import { VideoEntity } from "@/common/entities/vide";

export default function CustomVideoPlayer({
  video,
  onExpand,
  onClose,
  isFull
}: {
  video: VideoEntity;
  onExpand?: () => void;
  onClose?: () => void;
  isFull?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handleClose = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    onClose?.();
  };

  useEffect(() => {
    if (isFull) {
      setIsPlaying(true);
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isFull]);

  return (
    <div
      className={`relative ${
        isFull
          ? "fixed inset-0 z-50 mx-auto flex h-full max-h-[750px] w-full max-w-[1500px] items-center justify-center rounded-[32px] bg-black p-4"
          : "h-[199px] w-[351px] sm:mr-10 sm:h-[299px] sm:w-[451px]"
      }`}
      onClick={() => {
        if (isFull && onClose) onClose();
      }}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className={`rounded-xl object-contain ${
          isFull
            ? "h-full max-h-[750px] w-full max-w-[1500px]"
            : "h-full w-full"
        }`}
        controls={isPlaying}
      />

      {!isFull && !isPlaying && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
            onExpand?.();
          }}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600 p-4 text-white shadow-lg transition hover:bg-purple-700"
        >
          <Play />
        </button>
      )}

      {isFull && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute right-6 top-6 z-20 text-white transition hover:text-intense-purple"
        >
          <X />
        </button>
      )}
    </div>
  );
}
