"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import LoadingComponent from "@/components/atoms/Loading/loading";
import Select from "@/components/atoms/Select/select";
import AxisSection from "@/components/molecules/AxisSection/axisSection";
import Footer from "@/components/molecules/Footer/footer";
import PublicAccomplishmentSection from "@/components/molecules/PublicAccomplishmentSection/publicAccomplishmentSection";
import PublicEventsSection from "@/components/molecules/PublicEventsSection/publicEventsSection";
import PublicFAQ from "@/components/molecules/PublicFAQ/publicFAQ";
import PublicVideosSection from "@/components/molecules/PublicVideosSection/publicVideosSection";
import PublicNewsSection from "@/components/PublicNewsSection/publicNewsSection";
import { useGetAllCities } from "@/hooks/queries/useGetAllCities";
import useGetCityById from "@/hooks/queries/useGetCityBtId";
import CityInvestmentSection from "@/components/molecules/CityInvestmentSection/cityInvestmentSection";
import useGetInvestmentsByCity from "@/hooks/queries/useGetInvestmentsByCity";

export default function CityPage() {
  const { cityId } = useParams() as { cityId: string };
  const { data: city } = useGetCityById(cityId);
  const {data: investments} = useGetInvestmentsByCity(cityId);
  const router = useRouter();

  const { data: allCities } = useGetAllCities();

  const cityOptions = allCities?.map((city) => ({
    label: city.name,
    value: city.id
  }));

  return (
    <main className="relative z-10 flex min-h-screen flex-col justify-between">
      <div className="flex h-full w-full flex-col items-start justify-start gap-20 px-[8%] md:px-[4%]">
        <div className="flex h-full w-full flex-col items-start justify-start gap-20  pt-14">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <div className="mr-16 flex items-center gap-4 md:mr-0">
              <div
                onClick={() => router.push("/")}
                className="flex cursor-pointer items-center justify-center rounded-2xl p-2 transition-all duration-300 hover:bg-gray-100"
              >
                <ChevronLeft className="h-10 w-10" />
              </div>
              {city ? (
                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <div className="relative h-24 w-24">
                    <Image
                      src={city?.cityImageUrl || ""}
                      alt={city?.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h1 className="text-[32px] font-semibold">{city?.name}</h1>
                </div>
              ) : (
                <LoadingComponent />
              )}
            </div>
            <Select
              options={cityOptions ?? []}
              value={cityId}
              onChange={(value) => router.push(`/${value}`)}
              className="h-max w-max"
            />
          </div>
        </div>
        <AxisSection cityId={cityId} />
        <PublicAccomplishmentSection cityId={cityId} />
        <Image
          src="/images/i_gigante.svg"
          alt="Imagem de realização"
          width={1000}
          height={1000}
          className="absolute bottom-[25%] right-0 -z-20 object-cover"
        />
        <CityInvestmentSection investments={investments ?? []} />
        <PublicNewsSection cityId={cityId} cityName={city?.name || ""} />
        <PublicEventsSection cityId={cityId} />
        <PublicVideosSection cityId={cityId} />
        <PublicFAQ />
      </div>
      <Footer cityId={cityId} />
    </main>
  );
}
