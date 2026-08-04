import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import { EducationalAxisEntity } from "@/common/entities/educationalAxis";
import Button from "@/components/atoms/Button/button";
import { useAllAxis } from "@/hooks/queries/useAllAxis";
import { useCityActions } from "@/hooks/queries/useCityActions";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { deleteEducationalAxis } from "@/store/services/educationalAxis";

import AxisCard from "../AxisCard/axisCard";
import { ConfirmationModal } from "../ConfirmationModal/confirmationModal";
export default function PMECard({
  isEdit,
  cityId
}: {
  isEdit: boolean;
  cityId: string;
}) {
  const router = useRouter();
  const [fullView, setFullView] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const { data: axis, refetch } = useAllAxis();
  const collapsedAxis = axis?.slice(0, 6);
  const { data: actions } = useCityActions(cityId);
  const [isRotating, setIsRotating] = useState(false);
  const [axisToDelete, setAxisToDelete] = useState<EducationalAxisEntity>();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const queryClient = useQueryClient();

  // ponytail: apaga só o eixo, como o delete de meta já faz — metas do eixo ficam órfãs mas invisíveis (toda query filtra por educationalAxisId)
  const deleteMutation = useMutation(deleteEducationalAxis, {
    onSuccess: () => {
      queryClient.invalidateQueries(["educationalAxis"]);
      successToast("Eixo excluído com sucesso.");
      setDeleteLoading(false);
      setAxisToDelete(undefined);
    },
    onError: () => {
      setDeleteLoading(false);
      errorToast("Erro ao excluir eixo.");
    }
  });

  const handleViewToggle = () => {
    if (isEdit) {
      setIsScrollable(!isScrollable);
    } else {
      setFullView(!fullView);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-3xl border-2 border-[#BEA7DA] px-10 py-8">
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center gap-4">
          <h3 className="text-3xl">Plano municipal de educação (PME)</h3>
          <Button
            onClick={() => {
              setIsRotating(true);
              setTimeout(() => setIsRotating(false), 1000);
              refetch();
            }}
            className="w-max rounded-full p-3"
          >
            <RefreshCcw
              className={`h-6 w-6 transition-transform duration-1000 ${isRotating ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
        <p className="text-xl">
          Atualize as metas e divulgue a evolução do seu município
        </p>
      </div>
      <div
        className={`grid grid-cols-3 items-center justify-center gap-x-14 gap-y-10 ${isScrollable ? "max-h-[480px] overflow-y-auto" : ""}`}
      >
        {fullView || isScrollable
          ? axis?.map((axis) => (
              <AxisCard
                key={axis.id}
                axis={axis}
                actions={actions}
                onClick={() => router.push(`/home/${axis.id}`)}
                onDelete={() => setAxisToDelete(axis)}
              />
            ))
          : collapsedAxis?.map((axis) => (
              <AxisCard
                key={axis.id}
                axis={axis}
                actions={actions}
                onClick={() => router.push(`/home/${axis.id}`)}
                onDelete={() => setAxisToDelete(axis)}
              />
            ))}
      </div>
      <div
        className="cursor-pointer rounded-2xl p-2 transition-all hover:bg-gray-100"
        onClick={handleViewToggle}
      >
        {fullView || isScrollable ? (
          <div className="flex items-center gap-3">
            <p>Ver menos</p>
            <ChevronUp className="h-6 w-6" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <ChevronDown className="h-6 w-6" />
            <p>Ver mais</p>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={!!axisToDelete}
        setIsOpen={() => setAxisToDelete(undefined)}
        loading={deleteLoading}
        actionLabel="Excluir"
        title="Excluir eixo"
        content={`Você tem certeza que deseja excluir o eixo ${axisToDelete?.name}? Essa ação não pode ser desfeita.`}
        action={() => {
          setDeleteLoading(true);
          deleteMutation.mutate(axisToDelete?.id as string);
        }}
      />
    </div>
  );
}
