import useGetEventByTarget from "@/hooks/queries/useGetEventByTarget";
import { timestampToDate } from "@/utils/timestampToDate";

import PublicEventCard from "../PublicEventCard/publicEventCard";

export default function PublicEventsSection({ cityId }: { cityId: string }) {
  const { data: events } = useGetEventByTarget(cityId);

  const sortedByDateEvents = events?.sort((a, b) => {
    const aDate = timestampToDate(a.initialDate);
    const bDate = timestampToDate(b.initialDate);

    return bDate.getTime() - aDate.getTime();
  });

  if (sortedByDateEvents?.length === 0) {
    return (
      <div className="flex flex-col gap-14">
        <h4 className="text-center text-2xl md:text-start md:text-3xl">
          Próximos Eventos
        </h4>
        <p className="text-center text-lg md:text-start">
          Nenhum evento encontrado
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-14">
      <h4 className="text-center text-2xl md:text-start md:text-3xl">
        Próximos Eventos
      </h4>
      <div className="mb-10 flex flex-col gap-8 overflow-x-auto overflow-y-hidden md:flex-row">
        {sortedByDateEvents?.map((event) => (
          <PublicEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
