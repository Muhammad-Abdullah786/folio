"use client";
import { useApp } from "@/stores/use-app";
import Image from "next/image";

export const Wallpaper = () => {
  const { currentWallpaper } = useApp();
  return (
    <Image
      src={currentWallpaper}
      width={1000}
      height={1000}
      alt="wallpaper"
      className="absolute inset-0 z-10 h-full w-full object-cover object-center"
      draggable={false}
      fetchPriority="low"
    />
  );
};
