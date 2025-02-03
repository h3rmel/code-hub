import { connect, sendMessage } from "@/api/ws";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatHistory } from "@/components/chat-history";
import { Input } from "@/components/ui/input";
import React from "react";

export function App() {
  const [userMessage, setUserMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<{
    chatHistory: MessageEvent[];
  }>({
    chatHistory: [],
  });

  React.useEffect(() => {
    connect((message) => {
      setMessages((prevState) => ({
        chatHistory: [...prevState.chatHistory, message],
      }));
    });
  }, []);

  function send() {
    sendMessage(userMessage);
    setUserMessage("");
  }

  return (
    <ThemeProvider>
      <main className={cn("w-full min-h-screen")}>
        <Header />
        <section
          className={cn(
            "max-w-7xl h-[91.25dvh]",
            "flex flex-col gap-4 items-start",
            "mx-auto p-4"
          )}
        >
          <ChatHistory chatHistory={messages.chatHistory} />
          <div className={cn("flex items-center gap-4", "w-full")}>
            <Input
              value={userMessage}
              placeholder="Type your message here..."
              onChange={(event) => setUserMessage(event.target.value)}
            />
            <Button onClick={send}>Enviar</Button>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}
