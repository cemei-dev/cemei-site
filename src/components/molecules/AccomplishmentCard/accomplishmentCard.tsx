import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

import { AccomplishmentEntity } from "@/common/entities/accomplishment";
import LoadingComponent from "@/components/atoms/Loading/loading";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { deleteAccomplishment } from "@/store/services/accomplishment";
import { timestampToDate } from "@/utils/timestampToDate";

import { ConfirmationModal } from "../ConfirmationModal/confirmationModal";
import EditAccomplishmentModal from "../EditAccomplishmentModal/editAccomplishmentModal";

interface AccomplishmentCardProps {
  id: string;
  imageUrl: string;
  title: string;
  text: string;
  createdAt: Timestamp;
  accomplishment: AccomplishmentEntity;
  config?: boolean;
}

export default function AccomplishmentCard({
  createdAt,
  id,
  imageUrl,
  text,
  title,
  accomplishment,
  config = true
}: AccomplishmentCardProps) {
  const queryClient = useQueryClient();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const deleteMutation = useMutation(
    async (id: string) => {
      try {
        await deleteAccomplishment(id);
      } catch (error) {
        setDeleteLoading(false);
        errorToast("Erro ao deletar realização.");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["accomplishments"]);
        successToast("Realização deletada com sucesso.");
        setDeleteLoading(false);
      }
    }
  );

  const handleDeleteAccomplishment = (id: string) => {
    setDeleteLoading(true);
    deleteMutation.mutate(id);
  };

  return (
    <div
      key={id}
      className="flex h-[765px] w-[500px] flex-shrink-0 flex-col gap-10 rounded-3xl border border-purple-200 bg-white p-10"
    >
      {config && (
        <div className="flex gap-2 self-end">
          <div
            onClick={() => setIsEditOpen(true)}
            className="flex h-full transform cursor-pointer items-center rounded-xl p-2 transition-all duration-300 hover:bg-purple-400"
          >
            <Pencil />
          </div>
          <div
            onClick={() => setIsDeleteOpen(true)}
            className="flex h-full transform cursor-pointer items-center rounded-xl p-2 transition-all duration-300 hover:bg-purple-400"
          >
            {deleteLoading ? (
              <LoadingComponent className="h-4 w-4" />
            ) : (
              <Trash2 />
            )}
          </div>
        </div>
      )}

      <div className="relative h-[273px] w-full overflow-hidden rounded-3xl">
        <Image src={imageUrl} alt="Imagem de realização" fill priority />
      </div>
      <h1 className="break-words text-2xl font-bold">{title}</h1>
      <p className="overflow-y-auto break-words text-xl">{text}</p>
      <span className="text-sm font-semibold">
        Publicado em {timestampToDate(createdAt).toLocaleDateString("pt-BR")}
      </span>
      <EditAccomplishmentModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        accomplishment={accomplishment}
      />
      <ConfirmationModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        loading={deleteLoading}
        title="Tem certeza que deseja excluir essa realização?"
        content="Se completar essa ação, todas as informações e dados serão perdidos."
        actionLabel="Excluir"
        action={() => handleDeleteAccomplishment(id)}
      />
    </div>
  );
}
