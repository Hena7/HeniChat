# HeniChat 💬

A modern, real-time chat application built with Next.js 14+, TypeScript, TailwindCSS, Firebase Firestore, and Zustand for state management. Features a beautiful UI with dark mode support, emoji picker, typing indicators, and full responsiveness.

![HeniChat](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=for-the-badge&logo=firebase)

## ✨ Features

### Core Features

- **🔐 Mock Authentication** - Simple login with username and avatar selection
- **💬 Real-time Messaging** - Live chat updates powered by Firebase Firestore
- **📱 Fully Responsive** - Seamless experience on desktop, tablet, and mobile
- **🌓 Dark Mode** - System-aware dark/light theme with manual toggle
- **😊 Emoji Picker** - Rich emoji support for expressive conversations
- **⌨️ Typing Indicators** - See when others are typing
- **🔍 Search** - Quickly find conversations
- **⚡ Auto-scroll** - Messages automatically scroll to the latest
- **✨ Smooth Animations** - Framer Motion powered transitions

### UI Components

- Modern message bubbles (WhatsApp/Telegram inspired)
- Loading skeletons for better UX
- Toast notifications for user feedback
- Beautiful gradient accents
- Custom scrollbar styling

## 🛠️ Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **UI Components:** Custom components inspired by [ShadCN UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Emoji Picker:** [emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Date Formatting:** [date-fns](https://date-fns.org/)

## 📁 Folder Structure

```
HeniChat/
├── app/                          # Next.js App Router pages
│   ├── chats/                    # Chat pages
│   │   ├── [chatId]/             # Individual chat page
│   │   │   └── page.tsx          # Dynamic chat route
│   │   └── page.tsx              # Chat list page
│   ├── login/                    # Authentication
│   │   └── page.tsx              # Login page
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page (redirects)
│   └── globals.css               # Global styles & CSS variables
├── components/                   # React components
│   ├── chat/                     # Chat-specific components
│   │   ├── ChatHeader.tsx        # Chat header with user info
│   │   ├── ChatListItem.tsx      # Individual chat preview
│   │   ├── ChatSidebar.tsx       # Sidebar with chat list
│   │   ├── MessageBubble.tsx     # Message bubble component
│   │   ├── MessageInput.tsx      # Message input with emoji picker
│   │   └── TypingIndicator.tsx   # Animated typing indicator
│   ├── ui/                       # Reusable UI components
│   │   ├── avatar.tsx            # Avatar component
│   │   ├── button.tsx            # Button with variants
│   │   ├── card.tsx              # Card components
│   │   ├── input.tsx             # Input field
│   │   └── skeleton.tsx          # Loading skeleton
│   └── theme-provider.tsx        # Dark mode provider
├── lib/                          # Utilities & configuration
│   ├── demo-data.ts              # Demo users and chats
│   ├── firebase.ts               # Firebase configuration
│   ├── store.ts                  # Zustand state management
│   └── utils.ts                  # Helper functions
├── types/                        # TypeScript type definitions
│   └── index.ts                  # App-wide interfaces
├── .env.local.example            # Environment variables template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Firebase Account** (free tier works perfectly)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd HeniChat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**

   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/):

   - Create a new project
   - Add a web app
   - Enable Firestore Database
   - Copy your Firebase configuration

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔥 Firebase Setup Guide

### Setting up Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **Firestore Database** in the left sidebar
4. Click **Create Database**
5. Choose **Start in test mode** (for development)
6. Select a location closest to you
7. Click **Enable**

### Firestore Security Rules (for production)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chats/{chatId}/messages/{messageId} {
      allow read, write: if true; // Adjust based on your auth
    }
  }
}
```

### Data Structure

```
chats/ (collection)
  └── {chatId}/ (document)
      └── messages/ (subcollection)
          └── {messageId}/ (document)
              ├── chatId: string
              ├── senderId: string
              ├── senderName: string
              ├── text: string
              └── timestamp: timestamp
```

## 🎨 Features Walkthrough

### Authentication

- Users choose a username and fun emoji avatar
- Credentials stored in localStorage via Zustand
- Auto-redirect to chats after login

### Chat List

- Search functionality to filter chats
- Last message preview
- Timestamp formatting (relative and absolute)
- Unread message badges
- Loading skeletons while data loads

### Individual Chat

- Real-time message synchronization
- Optimistic UI updates
- Emoji picker integration
- Enter key to send messages
- Auto-scroll to latest message
- Typing indicators
- Demo mode fallback (if Firebase not configured)

### Dark Mode

- System preference detection
- Manual toggle in sidebar
- Smooth transitions between themes
- Custom color variables for consistency

## 🧪 Demo Mode

If Firebase is not configured, the app will work in **demo mode**:

- Uses pre-loaded demo chats and messages
- Messages persist in local state (not saved)
- All UI features work identically
- Perfect for testing and development

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Environment Variables on Vercel

Don't forget to add all `NEXT_PUBLIC_FIREBASE_*` variables in your Vercel project settings.

## 🎯 Future Enhancements

- [ ] Image/file sharing
- [ ] Voice messages
- [ ] Video calls
- [ ] Group chats
- [ ] Message reactions
- [ ] Message editing/deletion
- [ ] User presence (online/offline)
- [ ] Push notifications
- [ ] Read receipts
- [ ] Message search

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ by Henock M.

---

**Note:** This is a frontend-only application. For production use, implement proper authentication and security rules in Firebase.
