import { useState } from "react";

import { VideoEntity } from "@/common/entities/vide";
import { timestampToDate } from "@/utils/timestampToDate";

import CustomVideoPlayer from "../CustomVideoPlayer/customVideoPlayer";

export default function ExtendedVideoCard({ video }: { video: VideoEntity }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {!isExpanded && (
        <div className="flex h-max w-full flex-col rounded-[32px] border-2 border-[#CEC4DD] bg-white p-10">
          <h2 className=" mb-10 w-full text-2xl font-bold sm:mb-0">
            {video.title}
          </h2>
          <div className="flex w-full flex-col items-center justify-center sm:flex-row sm:items-start">
            <CustomVideoPlayer
              video={video}
              onExpand={() => setIsExpanded(true)}
            />
            <div className="flex h-full w-full flex-col items-center justify-between sm:items-start">
              <div className="mb-10 mt-10 flex flex-grow flex-col justify-start text-start sm:mb-0 sm:mt-16">
                <p className="line-clamp-3 text-xl font-light">{video.text}</p>
              </div>
              <div className="flex gap-10 sm:ml-auto">
                <span className="text-xs font-semibold sm:text-sm">
                  Publicado em{" "}
                  {timestampToDate(video.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <CustomVideoPlayer
          video={video}
          isFull
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}
