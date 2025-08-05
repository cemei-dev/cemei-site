"use client";

import { useState } from "react";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";

import Button from "@/components/atoms/Button/button";
import useAuth from "@hooks/useAuth";

import { NavbarProps, ResponsiveMenuProps } from "./types";

function ResponsiveMenu({ menuItems, onCloseMenu }: ResponsiveMenuProps) {
  const pathname = usePathname();
  const { logoutUser, loading } = useAuth();

  return (
    <div className="absolute inset-0 z-30 flex h-screen w-screen items-center justify-center bg-white lg:hidden">
      <button onClick={onCloseMenu} className="absolute right-4 top-6">
        <FiX size={32} color="#1681BC" />
      </button>
      <ul className="flex flex-col gap-8">
        {menuItems.map((button) => (
          <li
            key={button.label}
            className="text-blue-primary hover:text-blue-secondary flex cursor-pointer justify-center text-base font-bold transition-colors"
          >
            <Link
              href={button.href}
              className={`text-center ${
                pathname === button.href && "border-b-blue-secondary border-b-4"
              }`}
            >
              {button.label}
            </Link>
          </li>
        ))}
        <Button onClick={logoutUser} loading={loading.logout}>
          LOGOUT
        </Button>
      </ul>
    </div>
  );
}

export default function Navbar({ menuItems }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { logoutUser, userUid } = useAuth();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(
        `/searchItems?query=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="fixed top-0 z-50 flex h-32 w-full items-center justify-between bg-purple-1000 px-14">
      <div className="flex h-full items-center gap-3">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white">Observatório da</span>
          <span className="text-3xl font-bold text-white">
            Igualdade Educativa
          </span>
        </div>
        <Link href="/" className="relative h-6 w-32 cursor-pointer">
          <Image
            src="/images/logo-cemei.svg"
            alt="Logo CEMEI"
            fill
            className="object-contain"
          />
        </Link>
      </div>
      <div className="hidden items-center gap-8 lg:flex">
        {isSearchBarOpen ? (
          <div className="flex items-center gap-4">
            <div className="relative items-center">
              <button
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform"
                onClick={handleSearch}
              >
                <FiSearch size={20} color="white" />
              </button>

              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-96 items-center rounded-xl bg-purple-600 py-2 pl-10 pr-3 text-white placeholder-white"
              />
            </div>
            <button onClick={() => setIsSearchBarOpen(false)}>
              <FiX size={24} color="white" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsSearchBarOpen(true)}
              className="cursor-pointer"
            >
              <FiSearch size={24} color="white" />
            </button>
            <ul className="hidden h-full items-center justify-center gap-8 lg:flex">
              {menuItems.map((button) => (
                <li
                  key={button.label}
                  className={`flex h-full items-center text-lg text-white ${
                    pathname === button.href &&
                    "border-b-blue-secondary border-b-4 font-bold"
                  } cursor-pointer`}
                >
                  <Link href={button.href} className="flex h-full items-center">
                    {button.label}
                  </Link>
                </li>
              ))}
            </ul>
            {userUid && (
              <div
                onClick={logoutUser}
                className="flex h-full transform cursor-pointer items-center rounded-xl p-2 transition-all duration-300 hover:bg-purple-800"
              >
                <LogOut color="white" />
              </div>
            )}
          </>
        )}
      </div>

      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
          className="block cursor-pointer lg:hidden"
        >
          <FiMenu size={32} color="white" />
        </button>
      )}
      {isMenuOpen && (
        <ResponsiveMenu
          onCloseMenu={() => setIsMenuOpen(false)}
          menuItems={menuItems}
        />
      )}
    </nav>
  );
}
