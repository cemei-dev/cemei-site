import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { CityEntity } from "@/common/entities/city";
import Button from "@/components/atoms/Button/button";
import Input from "@/components/atoms/Input/input";
import LoadingComponent from "@/components/atoms/Loading/loading";
import { errorToast, successToast } from "@/hooks/useAppToast";
import useAuth from "@/hooks/useAuth";
import { UrlToFile } from "@/lib/UrlToFile";
import { updateCity } from "@/store/services/city";
import { uploadImage } from "@/store/services/firebaseStorage";
import { EditCitySchema, EditCityForm } from "@/validations/editCity";

import MultipleInputField from "../MultipleInputField/multipleInputField";
import UploadAreaControlled from "../UploadAreaControlled/uploadAreaControlled";

interface EditPanelCardProps {
  city: CityEntity;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
}

export default function EditPanelCard({
  city,
  setIsEdit,
  isEdit
}: EditPanelCardProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<EditCityForm>({
    mode: "all",
    resolver: zodResolver(EditCitySchema),
    criteriaMode: "all",
    defaultValues: {
      contactPhones: city.contactPhones,
      contactEmails: city.contactEmails,
      cityImageUrl: city.cityImageUrl
    }
  });

  const { userUid } = useAuth();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [cityImageUrl, setCityImageUrl] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const isMultiplesValid =
    watch("contactPhones").some((phone) => phone !== "" && phone !== "(") &&
    watch("contactEmails").some((email) => email !== "");

  useEffect(() => {
    const fetchImages = async () => {
      if (city.cityImageUrl) {
        setImageLoading(true);
        try {
          const file = await UrlToFile(city.cityImageUrl);
          setCityImageUrl(file);

          setValue("cityImageUrl", file);
        } catch (error) {
          console.error("Error fetching images:", error);
        } finally {
          setImageLoading(false);
        }
      }
    };

    if (isEdit) {
      fetchImages();
    }
  }, [city.cityImageUrl, isEdit, setValue]);

  const editMutation = useMutation(
    async (data: EditCityForm) => {
      let cityImageUrl = "";
      if (data.cityImageUrl) {
        try {
          const url = await uploadImage(data.cityImageUrl, "cities/");
          if (!url || !url.image) {
            throw new Error("Failed to get upload URL");
          }
          cityImageUrl = url.image as string;
        } catch (error) {
          setLoading(false);
          console.error("Image upload error:", error);
          errorToast(
            "Erro ao fazer upload da imagem. Verifique sua conexão e tente novamente."
          );
          throw error;
        }
      }
      try {
        await updateCity(city.id, {
          ...data,
          cityImageUrl,
          managerId: userUid
        });
      } catch (error) {
        console.error("City registration error:", error);
        errorToast("Erro ao editar município. Por favor, tente novamente.");
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["city", city.id]
        });
        setLoading(false);
        successToast("Município editado com sucesso");
        setIsEdit(false);
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: EditCityForm) => {
    setLoading(true);
    editMutation.mutateAsync(data);
  };

  return (
    <div className="flex h-full w-4/5 flex-col items-center justify-center gap-6 rounded-3xl border-2 border-[#BEA7DA] px-8 py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative h-[105px] w-full">
          <Image src={city.cityImageUrl} alt={city.name} fill />
        </div>
        <p className="text-xl">{city.name}</p>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Input
          disabled
          value={city.name}
          className="cursor-not-allowed bg-gray-200 text-gray-800"
          placeholder="Nome do município"
        />
        <MultipleInputField
          label="Telefones de contato"
          register={register}
          formErrors={errors}
          type="phone"
          name="contactPhones"
          placeholder="Esse telefone será disponibilizado para a população"
          control={control}
        />
        <MultipleInputField
          label="Emails de contato"
          register={register}
          formErrors={errors}
          name="contactEmails"
          control={control}
          placeholder="Esse email será disponibilizado para a população"
          type="email"
        />
        <UploadAreaControlled
          label="Logo do município"
          name="cityImageUrl"
          control={control}
          formErrors={errors}
          loading={imageLoading}
          isEdit
          editFile={cityImageUrl as File}
          required
        />
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || !isMultiplesValid}
        className="w-full"
        size="md"
      >
        {loading ? <LoadingComponent className="h-4 w-4" /> : "Concluir"}
      </Button>
    </div>
  );
}
