"use client";

import Navbar from "@/containers/Navbar/navbar";
import useGetCityById from "@/hooks/queries/useGetCityBtId";
import useProfile from "@/hooks/queries/useProfile";
import useAuth from "@/hooks/useAuth";
import AuthenticatedOnlyFeature from "@templates/Authenticated/authenticated";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { userUid } = useAuth();
  const { data: user } = useProfile(userUid);
  const city = useGetCityById(user?.cityId || "");

  const AuthMenuItems = [
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
      label: `${city.data?.name}`,
      href: "/home"
    }
  ];

  return (
    <AuthenticatedOnlyFeature>
      <main className="min-w-screen flex min-h-screen flex-col">
        <Navbar menuItems={AuthMenuItems} />
        <div className="flex flex-col gap-5 px-[4%] pt-40">{children}</div>
      </main>
    </AuthenticatedOnlyFeature>
  );
}
