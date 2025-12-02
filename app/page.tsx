"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const { currentUser } = useChatStore();

  useEffect(() => {
    if (currentUser) {
      router.push("/chats");
    } else {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg text-muted-foreground">
        Loading...
      </div>
    </div>
  );
}
