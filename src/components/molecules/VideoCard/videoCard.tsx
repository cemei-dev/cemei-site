import { VideoEntity } from "@/common/entities/vide";
import { timestampToDate } from "@/utils/timestampToDate";

export default function VideoCard({ video }: { video: VideoEntity }) {
  return (
    <div className="h-full w-full min-w-[350px] gap-10 rounded-[32px] border-2 border-[#CEC4DD] bg-white px-8 py-10 xl:w-max">
      <div className="mb-10 flex w-full items-center justify-between">
        <h2 className="w-full text-2xl font-bold">{video.title}</h2>
      </div>
      <div className="flex h-[400px] w-full flex-col items-start justify-start gap-10">
        <div className="relative h-[207px] w-full xl:w-[23rem]">
          <iframe
            src={video.videoUrl}
            className="h-full w-full rounded-xl object-fill"
            allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={video.title}
          />
        </div>
        <div className="mb-10 flex w-full flex-col justify-start gap-4 text-start">
          <p className="line-clamp-3 w-full max-w-[380px] text-xl font-light">
            {video.text}
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <span>
          Publicado em{" "}
          {timestampToDate(video.createdAt).toLocaleDateString("pt-BR")}
        </span>
      </div>
    </div>
  );
}
