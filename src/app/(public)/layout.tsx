"use client";

import Navbar from "@/containers/Navbar/navbar";
import PublicOnlyFeature from "@templates/Public/public";

export default function Layout({ children }: { children: React.ReactNode }) {
  const PublicMenuItems = [
    {
      label: `Principais notícias`,
      href: "/news"
    },
    {
      label: `Realizações da prefeitura`,
      href: "/accomplishment"
    },
    {
      label: `Eventos`,
      href: "/events"
    },
    {
      label: `Vídeos`,
      href: "/videos"
    },
    {
      label: `Painel Municipal`,
      href: "/login"
    }
  ];
  return (
    <PublicOnlyFeature>
      <main className="flex h-screen w-full flex-col gap-5">
        <Navbar menuItems={PublicMenuItems} />
        <div className="flex flex-col gap-5 pt-40">{children}</div>
      </main>
    </PublicOnlyFeature>
  );
}
