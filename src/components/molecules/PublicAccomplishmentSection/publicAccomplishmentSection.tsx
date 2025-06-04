import useGetAccomplishmentByCity from "@/hooks/queries/useGetAccomplishmentsByCity";
import { timestampToDate } from "@/utils/timestampToDate";

import PublicAccomplishmentCard from "../PublicAccomplishmentCard/publicAccomplishmentCard";

export default function PublicAccomplishmentSection({
  cityId
}: {
  cityId: string;
}) {
  const { data: accomplishments } = useGetAccomplishmentByCity(cityId);

  const sortedByDateAccomplishments = accomplishments?.sort((a, b) => {
    const aDate = timestampToDate(a.createdAt);
    const bDate = timestampToDate(b.createdAt);

    return bDate.getTime() - aDate.getTime();
  });

  if (accomplishments?.length === 0) {
    return (
      <div className="flex flex-col gap-14">
        <h4 className="text-center text-2xl md:text-start md:text-3xl">
          Realizações da prefeitura
        </h4>
        <p className="text-center text-lg md:text-start">
          Nenhuma realização encontrada
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-14">
      <h4 className="text-center text-2xl md:text-start md:text-3xl">
        Realizações da prefeitura
      </h4>
      <div className="mb-10 flex flex-col gap-8 overflow-x-auto overflow-y-hidden md:flex-row">
        {sortedByDateAccomplishments?.map((accomplishment) => (
          <PublicAccomplishmentCard
            key={accomplishment.id}
            id={accomplishment.id}
            imageUrl={accomplishment.imageUrl}
            title={accomplishment.title}
            text={accomplishment.text}
            createdAt={accomplishment.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
