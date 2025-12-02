import { Chat, User } from "@/types";

export const demoUsers: User[] = [
  { id: "user1", username: "Alice", avatar: "😊", online: true },
  { id: "user2", username: "Bob", avatar: "😎", online: true },
  { id: "user3", username: "Charlie", avatar: "🤓", online: false },
  { id: "user4", username: "Diana", avatar: "🌟", online: true },
  { id: "user5", username: "Eve", avatar: "🎨", online: false },
  { id: "user6", username: "Frank", avatar: "🚀", online: true },
  { id: "user7", username: "Grace", avatar: "🌺", online: true },
  { id: "user8", username: "Henry", avatar: "⚡", online: false },
];

export const demoChats: Chat[] = [
  {
    id: "chat1",
    participants: ["current-user", "user1"],
    participantNames: ["Alice"],
    participantAvatars: ["😊"],
    lastMessage: "Hey! How are you doing?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 2,
  },
  {
    id: "chat2",
    participants: ["current-user", "user2"],
    participantNames: ["Bob"],
    participantAvatars: ["😎"],
    lastMessage: "Thanks for your help earlier!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 0,
  },
  {
    id: "chat3",
    participants: ["current-user", "user3"],
    participantNames: ["Charlie"],
    participantAvatars: ["🤓"],
    lastMessage: "Did you check the docs?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
  },
  {
    id: "chat4",
    participants: ["current-user", "user4"],
    participantNames: ["Diana"],
    participantAvatars: ["🌟"],
    lastMessage: "See you tomorrow!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    unreadCount: 1,
  },
  {
    id: "chat5",
    participants: ["current-user", "user5"],
    participantNames: ["Eve"],
    participantAvatars: ["🎨"],
    lastMessage: "Love the new design!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
  },
  {
    id: "chat6",
    participants: ["current-user", "user6"],
    participantNames: ["Frank"],
    participantAvatars: ["🚀"],
    lastMessage: "Let's launch this!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    unreadCount: 0,
  },
];

export function generateDemoMessages(chatId: string, participantName: string) {
  return [
    {
      id: `${chatId}-msg1`,
      chatId,
      senderId: "current-user",
      senderName: "You",
      text: "Hey! How's it going?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: `${chatId}-msg2`,
      chatId,
      senderId: chatId.replace("chat", "user"),
      senderName: participantName,
      text: "Pretty good! Just working on some projects.",
      timestamp: new Date(Date.now() - 1000 * 60 * 50),
    },
    {
      id: `${chatId}-msg3`,
      chatId,
      senderId: "current-user",
      senderName: "You",
      text: "That's awesome! What are you building?",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: `${chatId}-msg4`,
      chatId,
      senderId: chatId.replace("chat", "user"),
      senderName: participantName,
      text: "Working on a cool chat app with Next.js! 🚀",
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
    },
  ];
}
