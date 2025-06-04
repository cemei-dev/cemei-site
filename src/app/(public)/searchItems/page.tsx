/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import AccomplishmentCard from "@/components/molecules/AccomplishmentCard/accomplishmentCard";
import EventCard from "@/components/molecules/EventCard/eventCard";
import NewsCarousel from "@/components/molecules/NewsCarousel/newsCarousel";
import VideoCard from "@/components/molecules/VideoCard/videoCard";
import { useGetAllAccomplishment } from "@/hooks/queries/useAllAccomplishment";
import { useGetAllEvents } from "@/hooks/queries/useAllEvents";
import { useGetAllNews } from "@/hooks/queries/useAllNews";
import { useGetAllVideos } from "@/hooks/queries/useAllVideos";

export default function SearchItems() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const { data: news } = useGetAllNews();
  const { data: accomplishment } = useGetAllAccomplishment();
  const { data: events } = useGetAllEvents();
  const { data: videos } = useGetAllVideos();

  const filterItems = (items: any[], fields: string[]) =>
    items?.filter((item) =>
      fields.some((field) => {
        const fieldValue = item[field];
        return fieldValue && typeof fieldValue === "string"
          ? fieldValue.toLowerCase().includes(query)
          : false;
      })
    ) || [];

  const filteredNews = news ? filterItems(news, ["title", "text"]) : [];
  const filteredAccomplishment = accomplishment
    ? filterItems(accomplishment, ["title", "text"])
    : [];
  const filteredEvents = events ? filterItems(events, ["title", "text"]) : [];
  const filteredVideos = videos ? filterItems(videos, ["title", "text"]) : [];

  return (
    <main className="relative z-10 flex min-h-screen flex-col justify-between">
      <div className="flex flex-col gap-14 px-[4%] pb-20 pt-48">
        <div className="flex items-center gap-1">
          <Link className="cursor-pointer" href={"/"}>
            <ChevronLeft />
          </Link>
          <h1 className="text-[32px] font-semibold text-gray-black">
            Resultado para busca &quot;{query}&quot;
          </h1>
        </div>
        {filteredNews.length > 0 && (
          <section className="flex flex-col gap-14">
            <h1 className="text-2xl font-normal text-gray-black">Notícias</h1>
            <NewsCarousel newsItems={filteredNews} />
          </section>
        )}
        {filteredVideos.length > 0 && (
          <section className="flex flex-col gap-14">
            <h1 className="text-2xl font-normal text-gray-black">Vídeos</h1>
            <div className="relative w-full">
              <div className="flex h-full w-full gap-x-14 overflow-x-auto overflow-y-visible">
                {filteredVideos?.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </section>
        )}
        {filteredEvents.length > 0 && (
          <section className="flex flex-col gap-14">
            <h1 className="text-2xl font-normal text-gray-black">Eventos</h1>
            <div className="relative w-full">
              <div className="flex h-full w-full gap-x-14 overflow-x-auto overflow-y-visible">
                {filteredEvents?.map((events) => (
                  <EventCard key={events.id} event={events} />
                ))}
              </div>
            </div>
          </section>
        )}
        {filteredAccomplishment.length > 0 && (
          <section className="flex flex-col gap-14">
            <h1 className="text-2xl font-normal text-gray-black">
              Realizações
            </h1>
            <div className="relative w-full">
              <div className="flex h-full w-full gap-x-14 overflow-x-auto overflow-y-visible">
                {filteredAccomplishment?.map((accomplishment) => (
                  <AccomplishmentCard
                    key={accomplishment.id}
                    accomplishment={accomplishment}
                    id={accomplishment.id}
                    imageUrl={accomplishment.imageUrl}
                    title={accomplishment.title}
                    text={accomplishment.title}
                    createdAt={accomplishment.createdAt}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
