import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ChatStore, User, Chat } from "@/types";

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      currentUser: null,
      chats: [],
      activeChat: null,
      isTyping: {},

      setCurrentUser: (user) => set({ currentUser: user }),

      setChats: (chats) => set({ chats }),

      setActiveChat: (chatId) => set({ activeChat: chatId }),

      setTyping: (chatId, isTyping) =>
        set((state) => ({
          isTyping: { ...state.isTyping, [chatId]: isTyping },
        })),

      addChat: (chat) =>
        set((state) => ({
          chats: [chat, ...state.chats],
        })),

      updateChatLastMessage: (chatId, message, timestamp) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, lastMessage: message, lastMessageTime: timestamp }
              : chat
          ),
        })),
    }),
    {
      name: "henichat-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);
