import Image from "next/image";
import Link from "next/link";

import { EventEntity } from "@/common/entities/event";
import useGetCityById from "@/hooks/queries/useGetCityBtId";
import { ensureHttps } from "@/lib/ensureHttps";
import { generateEventColor } from "@/utils/generateEventColor";
import { timestampToDate } from "@/utils/timestampToDate";

export default function EventCard({ event }: { event: EventEntity }) {
  const eventColor = generateEventColor(event.target);
  const { data: city } = useGetCityById(event.target);

  return (
    <div className="mb-12 flex h-[816px] w-[418px] flex-col justify-between gap-14 rounded-[32px] border border-purple-200 bg-white px-8 py-10">
      <div>
        <div className="flex flex-col gap-8">
          <Link
            href={ensureHttps(event.link)}
            target="_blank"
            className="relative h-[236px] w-full cursor-pointer transition-transform duration-500 hover:scale-105"
          >
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="rounded-xl object-cover"
            />
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-8">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <p className="line-clamp-6 text-xl font-light">{event.text}</p>
        </div>
      </div>

      <div className="flex flex-col justify-end gap-4">
        <div className="flex justify-between">
          <p className="text-xl">Local</p>
          <p className="text-sm">{event.place}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-xl">Data</p>
          <p className="text-sm">
            {timestampToDate(event.initialDate).toLocaleDateString("pt-BR")} a{" "}
            {timestampToDate(event.endDate).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div
          className="flex w-max items-center justify-center place-self-end rounded-2xl border px-16 py-1"
          style={{
            borderColor: eventColor,
            color: eventColor
          }}
        >
          <p className="text-sm">{city?.name || "Notícias gerais"}</p>
        </div>
      </div>
    </div>
  );
}
