"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Paperclip } from "lucide-react";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";


interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  documentContext: string;
}

export function ChatDrawer({ isOpen, onClose, documentContext }: ChatDrawerProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      role: "assistant",
      content: `I've analyzed the ${documentContext}. Do you have any specific questions about the clauses or the legal implications?`,
      timestamp: "Just now",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: ChatMessageProps = {
      role: "user",
      content: input,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Based on the Bharatiya Nyaya Sanhita (BNS) guidelines and the document provided, we can look into that specific section for you. Is there a particular paragraph you are concerned about?",
          timestamp: "Just now",
        },
      ]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l bg-background shadow-2xl sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h3 className="font-semibold text-foreground">Legal Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask anything about your case</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t p-4 bg-muted/20">
              <div className="flex items-end gap-2 rounded-2xl border bg-background p-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <button className="shrink-0 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask a question..."
                  className="max-h-32 min-h-[40px] w-full resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="shrink-0 rounded-full bg-primary p-2 text-primary-foreground disabled:opacity-50 transition-opacity hover:opacity-90"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
