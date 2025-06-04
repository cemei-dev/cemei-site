"use client";

import Image from "next/image";

import CityList from "@/components/molecules/CityCard/cityCard";
import FrequentlyQuestions from "@/components/molecules/FrequentlyQuestions/frequentlyQuestions";
import GoogleMaps from "@/components/molecules/GoogleMaps.tsx/googleMaps";
import NewsCarousel from "@/components/molecules/NewsCarousel/newsCarousel";
import VideoCard from "@/components/molecules/VideoCard/videoCard";
import PublicOnlyFeature from "@/components/templates/Public/public";
import Navbar from "@/containers/Navbar/navbar";
import { useGetAllVideos } from "@/hooks/queries/useAllVideos";

const PublicMenuItems = [
  {
    label: `Principais notícias`,
    href: "/news"
  },
  {
    label: `Realizações da prefeitura`,
    href: "/accomplishment"
  },
  {
    label: `Eventos`,
    href: "/events"
  },
  {
    label: `Vídeos`,
    href: "/videos"
  },
  {
    label: `Painel Municipal`,
    href: "/login"
  }
];

export default function Home() {
  const { data: videos } = useGetAllVideos();

  return (
    <PublicOnlyFeature>
      <main className="min-w-screen flex min-h-screen flex-col">
        <Navbar menuItems={PublicMenuItems} />
        <div className="flex flex-col gap-20 px-[4%] pb-20 pt-48">
          <section className="flex flex-col flex-wrap gap-14">
            <h1 className="text-[32px] font-semibold text-gray-black">
              Explore os planos de educação da sua cidade
            </h1>
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-36">
              <div className="w-full lg:w-1/2">
                <GoogleMaps />
              </div>
              <div className="flex w-full flex-col gap-4 lg:w-1/2">
                <CityList />
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-14">
            <h1 className="text-[32px] font-semibold text-gray-black">
              Notícias sobre planos de Educação
            </h1>
            <NewsCarousel target="1111111" />
          </section>
          <section className="relative flex flex-col gap-14">
            <Image
              className="hidden lg:block"
              src="/images/inclusao.svg"
              alt="Inclusão"
              width={600}
              height={600}
              style={{
                position: "absolute",
                left: -80,
                top: -60,
                zIndex: -1
              }}
            />
            <h1 className="text-[32px] font-semibold text-gray-black">
              Veja nossos vídeos
            </h1>
            {videos?.length && videos?.length > 0 ? (
              <div className="relative w-full">
                <div className="flex h-full w-full gap-x-14 overflow-x-auto overflow-y-visible">
                  {videos?.map((video) => (
                    <VideoCard key={video.id} video={video} />
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
          </section>
          <section className="flex flex-col gap-14">
            <h1 className="text-[32px] font-semibold text-gray-black">
              Perguntas frequentes
            </h1>
            <div className="lg:px-20">
              <FrequentlyQuestions />
            </div>
          </section>
        </div>
      </main>
    </PublicOnlyFeature>
  );
}
