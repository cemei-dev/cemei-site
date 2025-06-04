import { Timestamp } from "firebase/firestore";
import Image from "next/image";

import { timestampToDate } from "@/utils/timestampToDate";

interface PublicAccomplishmentCardProps {
  id: string;
  imageUrl: string;
  title: string;
  text: string;
  createdAt: Timestamp;
}

export default function PublicAccomplishmentCard({
  createdAt,
  id,
  imageUrl,
  text,
  title
}: PublicAccomplishmentCardProps) {
  return (
    <div
      key={id}
      className="mb-10 flex h-full w-full min-w-[350px] flex-col gap-10 rounded-3xl border border-purple-200 bg-white p-10 md:w-[22vw]"
    >
      <div className="relative h-[20vh] w-full overflow-hidden rounded-3xl">
        <Image
          src={imageUrl}
          alt="Imagem de realização"
          fill
          quality={100}
          priority
          className="object-cover"
        />
      </div>
      <h1 className="break-words text-2xl font-bold">{title}</h1>
      <p className="overflow-y-auto break-words text-xl">{text}</p>
      <span className="text-sm font-semibold">
        Publicado em {timestampToDate(createdAt).toLocaleDateString("pt-BR")}
      </span>
    </div>
  );
}
