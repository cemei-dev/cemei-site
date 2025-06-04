import { useState } from "react";

import { Plus } from "lucide-react";

import Button from "@/components/atoms/Button/button";
import useGetAccomplishmentByCity from "@/hooks/queries/useGetAccomplishmentsByCity";
import useProfile from "@/hooks/queries/useProfile";
import useAuth from "@/hooks/useAuth";

import AccomplishmentCard from "../AccomplishmentCard/accomplishmentCard";
import AddAccomplishmentModal from "../AddAccomplishmentModal/addAccomplishmentModal";

export default function AccomplishmentSection() {
  const { userUid } = useAuth();
  const { data: user } = useProfile(userUid);
  const cityAccomplishment = useGetAccomplishmentByCity(user?.cityId || "");

  const [isAddAccomplishmentModalOpen, setIsAddAccomplishmentModalOpen] =
    useState(false);
  return (
    <section className="flex h-full w-full flex-col gap-14 pb-10">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[32px] text-gray-950">Realizações do município</h1>
        <Button onClick={() => setIsAddAccomplishmentModalOpen(true)}>
          Adicionar realização <Plus />
        </Button>
      </div>
      {cityAccomplishment.data?.length ? (
        <div className="relative w-[full] 3xl:-mx-44">
          <div className="flex h-full w-full gap-x-14 overflow-x-auto overflow-y-visible">
            {cityAccomplishment?.data?.map((accomplishment) => (
              <AccomplishmentCard
                accomplishment={accomplishment}
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
      ) : (
        <h1 className="text-[32px] text-gray-950">
          Seu município não tem nenhuma realização!
        </h1>
      )}
      <AddAccomplishmentModal
        isOpen={isAddAccomplishmentModalOpen}
        setIsOpen={setIsAddAccomplishmentModalOpen}
      />
    </section>
  );
}
