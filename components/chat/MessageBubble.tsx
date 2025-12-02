"use client";

import { motion } from "framer-motion";
import { cn, formatMessageTime } from "@/lib/utils";
import { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const timestamp =
    message.timestamp instanceof Date
      ? message.timestamp
      : message.timestamp?.toDate
      ? message.timestamp.toDate()
      : new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex w-full",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm",
          isCurrentUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        )}
      >
        <p className="text-sm break-words">{message.text}</p>
        <p
          className={cn(
            "text-xs mt-1",
            isCurrentUser
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          )}
        >
          {formatMessageTime(timestamp)}
        </p>
      </div>
    </motion.div>
  );
}
