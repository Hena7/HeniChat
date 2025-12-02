import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  username: string;
  avatar: string;
  online?: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Timestamp | Date;
}

export interface Chat {
  id: string;
  participants: string[]; // Array of user IDs
  participantNames: string[];
  participantAvatars: string[];
  lastMessage?: string;
  lastMessageTime?: Timestamp | Date;
  unreadCount?: number;
}

export interface ChatStore {
  currentUser: User | null;
  chats: Chat[];
  activeChat: string | null;
  isTyping: { [chatId: string]: boolean };
  setCurrentUser: (user: User | null) => void;
  setChats: (chats: Chat[]) => void;
  setActiveChat: (chatId: string | null) => void;
  setTyping: (chatId: string, isTyping: boolean) => void;
  addChat: (chat: Chat) => void;
  updateChatLastMessage: (
    chatId: string,
    message: string,
    timestamp: Date
  ) => void;
}
