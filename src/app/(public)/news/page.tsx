"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import Footer from "@/components/molecules/Footer/footer";
import NewsCard from "@/components/molecules/NewsCard/newsCard";
import SelectField from "@/components/molecules/SelectField/selectField";
import { useGetAllCities } from "@/hooks/queries/useGetAllCities";
import { useGetGeneralNews } from "@/hooks/queries/useGetGeneralNews";

export default function News() {
  const { data: cities } = useGetAllCities();
  const { control, watch } = useForm({
    defaultValues: {
      city: "1111111"
    }
  });

  const selectedCity = watch("city");

  const { data: news } = useGetGeneralNews(selectedCity);

  const cityOptions = [
    { value: "1111111", label: "Geral" },
    ...(cities?.map((city: { id: string; name: string }) => ({
      value: city.id,
      label: city.name
    })) || [])
  ];

  return (
    <main className="relative z-10 flex min-h-screen flex-col justify-between px-[4%]">
      <div className="flex flex-col gap-20 px-[4%] pb-20 pt-48">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <Link className="cursor-pointer" href={"/"}>
              <ChevronLeft />
            </Link>
            <h1 className="text-[32px] font-semibold text-gray-black">
              Notícias
            </h1>
          </div>
          <SelectField
            control={control}
            name="city"
            options={cityOptions}
            placeholder="Selecione cidade"
          />
        </div>
        <div className="flex flex-col gap-14">
          {(news?.length ?? 0) === 0 ? (
            <div className="mt-20 flex items-center justify-center">
              <p className="text-center text-2xl font-extrabold">
                Nenhuma notícia adicionada
              </p>
            </div>
          ) : (
            news?.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0">
                <NewsCard
                  createdAt={item.createdAt}
                  imageUrl={item.imageUrl}
                  link={item.link}
                  text={item.text}
                  title={item.title}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="relative">
        {selectedCity !== "1111111" && selectedCity ? (
          <>
            {(news?.length ?? 0) > 0 && (
              <Image
                className="absolute bottom-[100px] right-0 z-[-1] hidden lg:block"
                src="/images/Conhecimento.svg"
                alt="Inclusão"
                width={600}
                height={600}
              />
            )}
            <Footer cityId={selectedCity} />
          </>
        ) : (
          (news?.length ?? 0) > 0 && (
            <Image
              className="absolute bottom-0 right-0 z-[-1] hidden lg:block"
              src="/images/Conhecimento.svg"
              alt="Inclusão"
              width={600}
              height={600}
            />
          )
        )}
      </div>
    </main>
  );
}
