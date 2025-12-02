"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChatStore } from "@/lib/store";
import { getRandomAvatar } from "@/lib/utils";
import { toast } from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const router = useRouter();
  const { currentUser, setCurrentUser } = useChatStore();

  const avatars = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😊",
    "😎",
    "🤓",
    "🧐",
    "😇",
    "🥳",
    "🤩",
    "😺",
    "😸",
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
  ];

  useEffect(() => {
    if (currentUser) {
      router.push("/chats");
    }
    setSelectedAvatar(getRandomAvatar());
  }, [currentUser, router]);

  const handleLogin = () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    const user = {
      id: "current-user",
      username: username.trim(),
      avatar: selectedAvatar,
      online: true,
    };

    setCurrentUser(user);
    toast.success(`Welcome, ${username}!`);
    router.push("/chats");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit"
            >
              <MessageCircle className="h-12 w-12" />
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to HeniChat
            </CardTitle>
            <CardDescription className="text-base">
              Choose your username and avatar to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                placeholder="Enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="text-base"
                autoFocus
              />
            </div>

            {/* Avatar Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose Avatar</label>
              <div className="grid grid-cols-8 gap-2">
                {avatars.map((avatar) => (
                  <motion.button
                    key={avatar}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                      selectedAvatar === avatar
                        ? "border-primary bg-primary/10 scale-110"
                        : "border-transparent hover:border-muted-foreground/20"
                    }`}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Join Button */}
            <Button
              onClick={handleLogin}
              className="w-full text-base h-12"
              size="lg"
            >
              Join Chat
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your username and avatar will be stored locally
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
