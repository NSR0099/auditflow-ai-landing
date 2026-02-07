import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat card */}
      {isOpen && (
        <div className="w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground">
                AI Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="px-4 py-6">
            <div className="rounded-xl rounded-tl-sm bg-accent px-4 py-3">
              <p className="text-sm text-foreground">
                Hi! 👋 I can help you navigate the platform. Ask me anything
                about AuditFlow.ai.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-3">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                className="h-9 text-sm"
              />
              <Button size="icon" className="h-9 w-9 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
