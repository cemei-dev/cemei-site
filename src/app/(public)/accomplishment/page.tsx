"use client";

import { ArrowUp, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import AccomplishmentCard from "@/components/molecules/AccomplishmentCard/accomplishmentCard";
import Footer from "@/components/molecules/Footer/footer";
import SelectField from "@/components/molecules/SelectField/selectField";
import useGetAccomplishmentByCity from "@/hooks/queries/useGetAccomplishmentsByCity";
import { useGetAllCities } from "@/hooks/queries/useGetAllCities";

export default function Accomplishment() {
  const { data: cities } = useGetAllCities();
  const { control, watch } = useForm();

  const selectedCity = watch("city");

  const { data: accomplishment } = useGetAccomplishmentByCity(selectedCity);

  const cityOptions = [
    { value: "", label: "Escolher cidade" },
    ...(cities?.map((city: { id: string; name: string }) => ({
      value: city.id,
      label: city.name
    })) || [])
  ];
  return (
    <main className="relative z-10 flex min-h-screen flex-col justify-between px-[4%]">
      <div className="flex flex-col items-center gap-20 px-[4%] pb-20 pt-48">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <Link className="cursor-pointer" href={"/"}>
              <ChevronLeft />
            </Link>
            <h1 className="text-[32px] font-semibold text-gray-black">
              Realizações da prefeitura
            </h1>
          </div>
          <SelectField
            control={control}
            name="city"
            options={cityOptions}
            placeholder="Selecione cidade"
          />
        </div>
        {(accomplishment?.length ?? 0) === 0 ? (
          <div className="mt-20 flex items-center justify-center gap-14">
            <p className="text-center text-4xl text-gray-medium">
              Escolha uma cidade disponível para descobrir suas realizações
            </p>
            <ArrowUp size={60} className=" text-gray-medium" />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-28 gap-y-14">
            {accomplishment?.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <AccomplishmentCard
                  config={false}
                  id={item.id}
                  accomplishment={item}
                  createdAt={item.createdAt}
                  imageUrl={item.imageUrl}
                  text={item.text}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        {(accomplishment?.length ?? 0) > 0 && (
          <Image
            className="absolute bottom-[100px] right-0 z-[-1] hidden lg:block"
            src="/images/educacao.svg"
            alt="Inclusão"
            width={600}
            height={600}
          />
        )}
        {selectedCity && <Footer cityId={selectedCity} />}
      </div>
    </main>
  );
}
