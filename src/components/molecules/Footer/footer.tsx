import Image from "next/image";

import useGetCityById from "@/hooks/queries/useGetCityBtId";

interface FooterProps {
  cityId: string;
}

export default function Footer({ cityId }: FooterProps) {
  const { data: city } = useGetCityById(cityId);
  const phones = city?.contactPhones || [];
  const emails = city?.contactEmails || [];
  return (
    <footer
      className="relative flex w-full flex-col items-center justify-center gap-10 bg-gray-white p-14"
      style={{
        boxShadow: "4px -4px 5px rgba(0, 0, 0, 0.06)"
      }}
    >
      <p className="text-center text-2xl font-bold text-intense-purple">
        Entre em contato com a secretaria de educação do seu município
      </p>
      <div className="hidden w-full items-center justify-between lg:flex">
        <div className="flex flex-col items-start gap-6">
          <p className="text-2xl text-intense-purple">Telefone</p>
          <div className="flex flex-col items-start gap-2">
            {phones?.map((phone: string, index: number) => (
              <p key={index} className="text-xl text-gray-black">
                {phone}
              </p>
            ))}
          </div>
        </div>
        <Image
          src="/images/logo-cemei-roxo.svg"
          alt="Logo CEMEI"
          width={213}
          height={56}
        />
        <div className="flex flex-col items-start gap-6">
          <p className="text-2xl text-intense-purple">Email</p>
          <div className="flex flex-col items-start gap-2">
            {emails?.map((email: string, index: number) => (
              <p key={index} className="text-xl text-gray-black">
                {email}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-10 lg:hidden lg:flex-row">
        <div className="flex w-full justify-center lg:w-auto">
          <Image
            src="/images/logo-cemei-roxo.svg"
            alt="Logo CEMEI"
            width={213}
            height={56}
          />
        </div>
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
          <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:items-start">
            <p className="text-2xl text-intense-purple">Telefone</p>
            <div className="flex flex-col items-center gap-2 lg:items-start">
              {phones.map((phone: string, index: number) => (
                <p key={index} className="break-words text-xl text-gray-black">
                  {phone}
                </p>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:items-end">
            <p className="text-2xl text-intense-purple">Email</p>
            <div className="flex flex-col items-center gap-2 lg:items-end">
              {emails.map((email: string, index: number) => (
                <p key={index} className="break-words text-xl text-gray-black">
                  {email}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
