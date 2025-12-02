"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="flex items-center gap-1 bg-muted rounded-2xl px-4 py-3">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-bounce"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-bounce"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-bounce"></div>
      </div>
    </div>
  );
}
