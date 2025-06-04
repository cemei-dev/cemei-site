import { useCallback } from "react";

import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaLink, FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";

import { ensureHttps } from "@/lib/ensureHttps";
import { timestampToDate } from "@/utils/timestampToDate";

interface NewsCardProps {
  title: string;
  text: string;
  imageUrl: string;
  link: string;
  createdAt: Timestamp;
}

export default function NewsCard({
  imageUrl,
  link,
  text,
  title,
  createdAt
}: NewsCardProps) {
  const shareUrl = ensureHttps(link);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("Link copiado para a área de transferência!");
    });
  }, [shareUrl]);

  const handleInstagramShare = useCallback(() => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.info("Link copiado! Agora cole nos stories do Instagram.");
      window.open("https://www.instagram.com/", "_blank");
    });
  }, [shareUrl]);

  const handleWhatsappShare = useCallback(() => {
    const message = `${title}\n\n${text}\n\nConfira aqui: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }, [title, text, shareUrl]);

  const handleTwitterShare = useCallback(() => {
    const tweet = `${title} - ${text}\n${shareUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(twitterUrl, "_blank");
  }, [title, text, shareUrl]);

  return (
    <div className="h-max w-full rounded-[32px] border-[3px] border-[#BFDAE4] bg-white px-6 py-8 lg:px-8 lg:py-6">
      <div className="mb-2 flex justify-between">
        <span className="ml-auto text-xs font-normal sm:text-sm">
          Publicado em {timestampToDate(createdAt).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:gap-16">
        <Link
          href={ensureHttps(link)}
          target="_blank"
          className="relative h-[15vh] w-full max-w-[600px] cursor-pointer transition-transform duration-500 hover:scale-105 md:h-[25vh]"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-xl object-cover"
          />
        </Link>
        <div className="mb-6 flex w-full flex-col justify-center gap-2 place-self-center text-start lg:gap-4">
          <h2 className="text-base font-bold sm:text-sm lg:text-2xl">
            {title}
          </h2>
          <p className="line-clamp-3 w-full text-xs font-light sm:text-xs lg:text-xl">
            {text}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 md:mt-2 sm:gap-2">
        <span className="ml-auto text-xs font-semibold sm:text-sm">
          Compartilhe
        </span>
        <FaLink
          onClick={handleCopyLink}
          className="cursor-pointer hover:opacity-80"
          size={24}
        />
        <FaWhatsapp
          onClick={handleWhatsappShare}
          className="cursor-pointer hover:opacity-80"
          size={24}
        />
        <FaInstagram
          onClick={handleInstagramShare}
          className="cursor-pointer hover:opacity-80"
          size={24}
        />
        <FaTwitter
          onClick={handleTwitterShare}
          className="cursor-pointer hover:opacity-80"
          size={24}
        />
      </div>
    </div>
  );
}
