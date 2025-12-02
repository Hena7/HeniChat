"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/lib/store";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { demoChats } from "@/lib/demo-data";
import { MessageCircle } from "lucide-react";

export default function ChatsPage() {
  const router = useRouter();
  const { currentUser, chats, setChats } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    // Load demo chats
    if (chats.length === 0) {
      setTimeout(() => {
        setChats(demoChats);
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [currentUser, router, chats.length, setChats]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Hidden on mobile when a chat is active */}
      <div className="w-full md:w-80 lg:w-96">
        <ChatSidebar chats={chats} isLoading={isLoading} />
      </div>

      {/* Empty State for Desktop */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
        <div className="text-center space-y-4 p-8">
          <div className="mx-auto bg-primary/10 rounded-full p-6 w-fit">
            <MessageCircle className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">
            Select a chat to start messaging
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Choose a conversation from the sidebar or start a new chat
          </p>
        </div>
      </div>
    </div>
  );
}
