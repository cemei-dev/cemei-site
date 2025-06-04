import { useCityVideos } from "@/hooks/queries/useCityVideos";

import VideoCard from "../VideoCard/videoCard";

export default function PublicVideosSection({ cityId }: { cityId: string }) {
  const { data: videos } = useCityVideos(cityId);
  return (
    <div className="flex w-full flex-col gap-14">
      <h2 className="text-center text-2xl md:text-start md:text-3xl">
        Veja nossos vídeos
      </h2>
      <div className="relative w-full">
        {videos && videos.length > 1 ? (
          <div className="flex h-full w-full flex-col gap-x-14 gap-y-14 place-self-center overflow-x-auto overflow-y-visible lg:flex-row xl:gap-y-0">
            {videos?.map((video) => <VideoCard key={video.id} video={video} />)}
          </div>
        ) : (
          <div className="mt-20 items-center justify-center pb-20">
            <p className="text-center text-2xl font-extrabold">
              Nenhum vídeo adicionado
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
