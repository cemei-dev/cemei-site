"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputField from "@/components/molecules/InputField/inputField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import ForgotPasswordFormSchema from "@/validations/forgot-password";
import Button from "@atoms/Button/button";
import useAuth from "@hooks/useAuth";

type ForgotPasswordForm = z.infer<typeof ForgotPasswordFormSchema>;

export default function ForgotPassword() {
  const { forgotPassword, loading } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ForgotPasswordForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ForgotPasswordFormSchema)
  });

  const handleSubmitForm = (data: ForgotPasswordForm) => {
    forgotPassword(data.email);
    setIsDialogOpen(true);
  };

  return (
    <main className="flex h-screen w-full items-center justify-center gap-[7%] px-[4%] px-[6%]">
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
          Redefinir senha
        </h2>
        <p className="self-start text-xl text-gray-950">
          Redefina sua senha e acesse sua conta novamente .
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

          <Link
            href="/login"
            className="text-center text-sm text-intense-purple underline hover:cursor-pointer"
          >
            Login
          </Link>
          <Button className="mt-4" loading={loading.forgotPassword}>
            Enviar
          </Button>
        </form>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Verifique seu email</DialogTitle>
            <DialogDescription className="text-lg">
              Enviamos um link para redefinir sua senha para o e-mail informado.
              Se não encontrar o e-mail na caixa de entrada, verifique sua pasta
              de spam ou lixo eletrônico.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
