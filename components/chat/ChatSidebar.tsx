"use client";

import { useState } from "react";
import { Search, PlusCircle, LogOut, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ChatListItem } from "./ChatListItem";
import { Chat } from "@/types";
import { useChatStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatSidebarProps {
  chats: Chat[];
  activeChat?: string;
  isLoading?: boolean;
}

export function ChatSidebar({
  chats,
  activeChat,
  isLoading,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser, setCurrentUser } = useChatStore();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const filteredChats = chats.filter((chat) =>
    chat.participantNames[0].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/");
  };

  return (
    <div className="h-screen flex flex-col border-r bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            HeniChat
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.username}
            className="h-10 w-10"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm">{currentUser?.username}</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3 border-b">
        <Button className="w-full" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-3 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[60%]" />
                  <Skeleton className="h-3 w-[80%]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={activeChat === chat.id}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <p className="text-muted-foreground">No chats found</p>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Try a different search term
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
