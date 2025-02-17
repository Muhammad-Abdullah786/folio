import React from "react";
import { SKILLS } from "@/config/skills.config";
import Image from "next/image";

export const SkillsAppContent = () => {
  return (
    <div className="grid w-full auto-rows-auto grid-cols-12 gap-6 md:gap-10 xl:gap-12">
      {SKILLS?.map((skill) => {
        return (
          <div
            key={skill.title}
            className="col-span-6 flex flex-col items-center justify-center gap-2 sm:col-span-6 md:col-span-4 xl:col-span-2"
          >
            <Image
              src={skill.icon}
              alt={`${skill.title} icon`}
              width={100}
              height={100}
              draggable={false}
              className="aspect-square object-contain max-w-12 sm:max-w-max"
            />
            <span className="text-center text-sm sm:text-base font-semibold">{skill.title}</span>
          </div>
        );
      })}
    </div>
  );
};
