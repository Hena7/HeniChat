"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatChatTime } from "@/lib/utils";
import { Chat } from "@/types";

interface ChatListItemProps {
  chat: Chat;
  isActive?: boolean;
}

export function ChatListItem({ chat, isActive }: ChatListItemProps) {
  const name = chat.participantNames[0];
  const avatar = chat.participantAvatars[0];
  const lastMessageTime = chat.lastMessageTime
    ? chat.lastMessageTime instanceof Date
      ? chat.lastMessageTime
      : chat.lastMessageTime.toDate()
    : new Date();

  return (
    <Link href={`/chats/${chat.id}`}>
      <div
        className={cn(
          "flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors border-b border-border/50",
          isActive && "bg-accent"
        )}
      >
        <Avatar src={avatar} alt={name} className="h-12 w-12" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm truncate">{name}</h3>
            <span className="text-xs text-muted-foreground">
              {formatChatTime(lastMessageTime)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground truncate">
              {chat.lastMessage || "No messages yet"}
            </p>
            {chat.unreadCount && chat.unreadCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
