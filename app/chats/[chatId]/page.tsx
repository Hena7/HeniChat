"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useChatStore } from "@/lib/store";
import { db } from "@/lib/firebase";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { MessageInput } from "@/components/chat/MessageInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Message } from "@/types";
import { toast } from "sonner";
import { generateDemoMessages } from "@/lib/demo-data";

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.chatId as string;
  const { currentUser, chats, setActiveChat } = useChatStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((c) => c.id === chatId);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    setActiveChat(chatId);

    // Load demo messages for this chat
    if (currentChat) {
      setTimeout(() => {
        const demoMessages = generateDemoMessages(
          chatId,
          currentChat.participantNames[0]
        );
        setMessages(demoMessages);
        setIsLoading(false);
      }, 800);
    }

    // Set up Firestore real-time listener
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newMessages: Message[] = [];
        snapshot.forEach((doc) => {
          newMessages.push({ id: doc.id, ...doc.data() } as Message);
        });

        // Only update if we have Firestore messages (to avoid overwriting demo data)
        if (newMessages.length > 0) {
          setMessages(newMessages);
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching messages:", error);
        // Continue with demo data if Firestore is not configured
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
      setActiveChat(null);
    };
  }, [chatId, currentUser, router, setActiveChat, currentChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!currentUser || !currentChat) return;

    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      chatId,
      senderId: currentUser.id,
      senderName: currentUser.username,
      text,
      timestamp: new Date(),
    };

    // Optimistically add message to UI
    setMessages((prev) => [...prev, newMessage]);

    try {
      // Try to send to Firestore
      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        chatId,
        senderId: currentUser.id,
        senderName: currentUser.username,
        text,
        timestamp: serverTimestamp(),
      });

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      // Message is already added optimistically, so keep it in demo mode
      toast.error("Unable to send to Firestore (using demo mode)");

      // Simulate typing indicator even in demo mode
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  if (!currentUser || !currentChat) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block w-80 lg:w-96">
        <ChatSidebar chats={chats} activeChat={chatId} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        <ChatHeader
          name={currentChat.participantNames[0]}
          avatar={currentChat.participantAvatars[0]}
          online={true}
        />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex ${
                    i % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <Skeleton className="h-16 w-[60%] rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === currentUser.id}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Message Input */}
        <MessageInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
