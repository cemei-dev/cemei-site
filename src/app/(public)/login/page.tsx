"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputField from "@/components/molecules/InputField/inputField";
import { useAllManagers } from "@/hooks/queries/useAllUsers";
import { errorToast } from "@/hooks/useAppToast";
import SignInFormSchema from "@/validations/signIn";
import Button from "@atoms/Button/button";
import useAuth from "@hooks/useAuth";

type SignInForm = z.infer<typeof SignInFormSchema>;

export default function LoginPage() {
  const { loginWithInternalService, loading } = useAuth();
  const { data: permitedUsers } = useAllManagers();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignInForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignInFormSchema)
  });

  const handleSubmitForm = (data: SignInForm) => {
    const isAdminOrCollaborator = permitedUsers?.some(
      (user) => user.email === data.email
    );
    if (isAdminOrCollaborator)
      loginWithInternalService(data.email, data.password);
    else errorToast("Você não tem permissão para acessar a plataforma");
  };

  return (
    <main className="flex h-full w-full items-center justify-center gap-[7%] px-[4%] pt-20">
      <div className="flex w-1/2 items-center justify-center">
        <Image
          src="/images/cemei-i.svg"
          alt="Login Background"
          width={700}
          height={594}
          quality={100}
        />
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center gap-8">
        <h1 className="self-start text-3xl font-bold">Área gestão Municipal</h1>
        <h2 className="self-start text-2xl font-bold text-intense-purple">
          Área gestão Municipal
        </h2>
        <p className="text-xl text-gray-950">
          Este ambiente foi desenvolvido para que as prefeituras possam
          gerenciar e acompanhar o progresso das metas do Plano Municipal de
          Educação. Aqui, você poderá, monitorar a implementação das ações
          planejadas e garantir que as metas educacionais sejam atingidas de
          forma eficiente. Nosso sistema seguro e fácil de usar oferece as
          ferramentas necessárias para apoiar a tomada de decisões e melhorar
          continuamente a qualidade da educação no seu município.
        </p>
        <form
          className="flex w-full flex-col gap-6"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <InputField
            register={register}
            name="email"
            placeholder="email@email.com"
            label="Email"
            type="email"
            formErrors={errors}
          />
          <InputField
            register={register}
            name="password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            label="Senha"
            formErrors={errors}
            suffix={
              showPassword ? (
                <Eye
                  color="#7546BC"
                  onClick={() => setShowPassword(false)}
                  size={20}
                />
              ) : (
                <EyeOff
                  color="#7546BC"
                  onClick={() => setShowPassword(true)}
                  size={20}
                />
              )
            }
          />
          <Link
            href="/forgot-password"
            className="text-center text-sm text-intense-purple underline hover:cursor-pointer"
          >
            Esqueci minha senha
          </Link>
          <Button className="mt-4" loading={loading.loginWithInternalService}>
            Entrar
          </Button>
        </form>
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="text-sm font-bold text-gray-950">
            Seu município ainda não faz parte de CEMEI?
          </span>
          <Link
            href="/"
            className="flex items-center gap-2 text-center text-sm text-intense-purple underline hover:cursor-pointer"
          >
            Entre em contato com nosso time! <Mail />
          </Link>
        </div>
      </div>
    </main>
  );
}
