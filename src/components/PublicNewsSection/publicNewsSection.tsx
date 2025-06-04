import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { useGetNewsByTarget } from "@/hooks/queries/useNewsByTarget";

import NewsCard from "../molecules/NewsCard/newsCard";

export default function PublicNewsSection({
  cityId,
  cityName
}: {
  cityId: string;
  cityName: string;
}) {
  const { data: news } = useGetNewsByTarget(cityId);

  if (news?.length === 0) {
    return (
      <div className="mb-10 flex flex-col items-start gap-14">
        <h4 className="text-center text-2xl md:text-start md:text-3xl">
          Principais notícias de {cityName}
        </h4>
        <p className="text-center text-lg md:text-center">
          Nenhuma notícia encontrada
        </p>
      </div>
    );
  }

  return (
    <div className="mb-10 flex flex-col gap-14">
      <h4 className="text-center text-2xl md:text-start md:text-3xl">
        Principais notícias de {cityName}
      </h4>
      <Carousel className="hidden p-0 md:block">
        <CarouselContent>
          {news?.map((news) => (
            <CarouselItem key={news.id}>
              <NewsCard
                title={news.title}
                text={news.text}
                imageUrl={news.imageUrl}
                link={news.link}
                createdAt={news.createdAt}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="block md:hidden">
        <div className="flex flex-col gap-4">
          {news?.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              text={news.text}
              imageUrl={news.imageUrl}
              link={news.link}
              createdAt={news.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
