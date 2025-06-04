"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ExtendedVideoCard from "@/components/molecules/ExtendedVideoCard/extendedVideoCard";
import { useGetAllVideos } from "@/hooks/queries/useAllVideos";

export default function Videos() {
  const { data: videos } = useGetAllVideos();

  return (
    <main className="relative z-10 flex min-h-screen w-full flex-col justify-between">
      <div className="flex flex-col gap-20 px-[4%] pb-20 pt-48">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <Link className="cursor-pointer" href={"/"}>
              <ChevronLeft />
            </Link>
            <h1 className="text-[32px] font-semibold text-gray-black">
              Vídeos
            </h1>
          </div>
        </div>
        {videos?.length && videos?.length > 0 ? (
          <div className="relative w-full">
            <div className="flex h-full w-full flex-col gap-14">
              {videos?.map((video) => (
                <ExtendedVideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-20 items-center justify-center pb-20">
            <p className="text-center text-2xl font-extrabold">
              Nenhum vídeo adicionado
            </p>
          </div>
        )}
      </div>
      <div className="relative">
        {(videos?.length ?? 0) > 0 && (
          <Image
            className="absolute bottom-0 right-0 z-[-1] hidden lg:block"
            src="/images/educacao.svg"
            alt="Inclusão"
            width={600}
            height={600}
          />
        )}
      </div>
    </main>
  );
}
