"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
  name: string;
  avatar: string;
  online?: boolean;
}

export function ChatHeader({ name, avatar, online }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3 sticky top-0 z-10">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => router.push("/chats")}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Avatar src={avatar} alt={name} className="h-10 w-10" />

      <div className="flex-1">
        <h2 className="font-semibold text-sm">{name}</h2>
        {online !== undefined && (
          <p className="text-xs text-muted-foreground">
            {online ? "Online" : "Offline"}
          </p>
        )}
      </div>

      <Button variant="ghost" size="icon">
        <MoreVertical className="h-5 w-5" />
      </Button>
    </div>
  );
}
