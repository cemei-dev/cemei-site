import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

import { ResultEntity } from "@/common/entities/result";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { deleteActionResult } from "@/store/services/result";

import { ConfirmationModal } from "../ConfirmationModal/confirmationModal";
import EditResultModal from "../EditResultModal/editResultModal";

export default function ResultCard({ result }: { result: ResultEntity }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (id: string) => {
      try {
        await deleteActionResult(id);
      } catch (error) {
        setDeleteLoading(false);
        errorToast("Erro ao deletar realização.");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["results"]);
        successToast("Resultado de ação deletada com sucesso.");
        setDeleteLoading(false);
      }
    }
  );

  const handleDeleteResult = (id: string) => {
    setDeleteLoading(true);
    deleteMutation.mutateAsync(id);
  };
  return (
    <div className="flex w-full items-center justify-between rounded-3xl bg-[#FCFDFE]">
      <div className="relative h-56 w-[32rem] rounded-3xl">
        <Image
          src={result.imageUrl}
          alt="Imagem do resultado"
          fill
          className="rounded-3xl object-cover"
        />
      </div>
      <div className="flex w-[40%] flex-col items-center justify-center gap-6  text-start">
        <h3 className="ml-8 w-full text-start text-2xl font-bold">
          {result.result}
        </h3>
      </div>
      <div className="my-6 mr-10 w-max place-self-start">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <div
              onClick={() => setIsDropdownOpen(true)}
              className="cursor-pointer rounded-xl p-2 transition-all duration-300 hover:bg-gray-100"
            >
              <EllipsisVertical />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setIsEditModalOpen(true);
                setIsDropdownOpen(false);
              }}
              className="text-lg"
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setIsDropdownOpen(false);
              }}
              className="text-lg"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EditResultModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        result={result}
      />
      <ConfirmationModal
        title="Excluir resultado de ação"
        content="Você tem certeza que deseja excluir este resultado de ação?"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        action={() => handleDeleteResult(result.id)}
        loading={deleteLoading}
        actionLabel="Excluir"
      />
    </div>
  );
}
