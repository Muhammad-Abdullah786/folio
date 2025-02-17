"use client";
import React, { memo, useEffect, useState } from "react";
import { useApp } from "@/stores/use-app";
import { App as AppType } from "@/types";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { APP_TYPES } from "@/constants/app-types.enum";
import { LucideProps } from "lucide-react";
import { getIcon } from "@/utils";

export const AllApps = () => {
  const { apps, windows, addWindow, setFocusedWindow } = useApp();
  useEffect(() => {
    const recentlyAddedWindow = windows[windows?.length - 1];
    setFocusedWindow(recentlyAddedWindow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windows]);
  return (
    <div className="flex h-max w-full flex-wrap items-start justify-start gap-10 px-8 py-6 md:h-[89vh] md:w-min md:flex-col">
      {apps
        ?.filter((app) => app.isOnDesktop === undefined || false)
        ?.map((app) => {
          return (
            <App
              key={app.id}
              app={{
                title: app.title,
                id: app.id,
                isOnDesktop: app.isOnDesktop,
                icon: app.icon,
              }}
            />
          );
        })}
    </div>
  );
};

const App = memo(({ app }: { app: Omit<AppType, "content"> }) => {
  const selectedAppId = useApp((state) => state.selectedAppId);
  const setSelectedAppId = useApp((state) => state.setSelectedAppId);

  const { addWindow } = useApp();

  return (
    <ContextMenu
      onOpenChange={() => {
        setSelectedAppId(app.id);
      }}
    >
      <ContextMenuTrigger>
        {" "}
        <div
          key={app.id}
          className={cn(
            "flex size-24 w-min select-none flex-col items-center justify-center gap-2 rounded-sm border-2 border-transparent p-2 text-left transition-all duration-100 ease-in hover:cursor-pointer hover:border-blue-200 hover:bg-blue-200 hover:bg-opacity-50 sm:size-28",
            {
              "border-2 border-blue-400 bg-blue-400 bg-opacity-50":
                selectedAppId === app.id,
            },
          )}
          onClick={() => {
            setSelectedAppId(app.id);
          }}
          onDoubleClick={() => {
            if (selectedAppId === app.id) {
              addWindow({
                id: app.id,
                title: app.title,
                type: APP_TYPES.APP,
              });
              setSelectedAppId(null);
            }
          }}
        >
          {getIcon(app.icon)}
          <span className="text-sm font-medium  "> {app.title} </span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            addWindow({
              id: app.id,
              title: app.title,
              type: APP_TYPES.APP,
            });
            setSelectedAppId(null);
          }}
        >
          Open
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
});

App.displayName = "App";
