"use client";
import { useGetAllQuotes } from "@/hooks/use-quotes";
import { Card, CardContent } from "../ui/card";
import { Quote as QuoteIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
export const dynamic = "force-dynamic";
export const QuoteWidget = () => {
  const { data: quotes, isLoading, isError, error } = useGetAllQuotes();
  const quote = quotes?.data?.[0];
  if (quotes?.data?.length === 0) return null;
  if (!quote?.content || isError) return null;

  if (isLoading) {
    return <Skeleton className="h-40 w-full rounded-2xl" />;
  }
  return (
    <Card className="relative w-full rounded-2xl bg-amber-900 text-white ">
      <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
        <QuoteIcon className="absolute left-4 top-4 size-4 text-amber-500 opacity-50 lg:size-6" />
        <div className="absolute right-2 top-2 rounded-sm flex items-center justify-center gap-1 py-0.5 px-1 bg-transparent border border-red-500 bg-white">
          <div className="size-2 rounded-full bg-red-500"></div>
          <span className="text-xs text-red-500">LIVE</span>
        </div>
        <div className="max-w-[80%]">
          <blockquote className="mb-4 font-serif text-lg italic transition-opacity duration-500 ease-in-out hover:opacity-80 md:text-xl">
            {quote?.content}
          </blockquote>
          <cite className="font-sans text-sm not-italic transition-opacity duration-500 ease-in-out hover:opacity-80 md:text-lg">
            — {quote?.author}
          </cite>
        </div>
      </CardContent>
    </Card>
  );
};
