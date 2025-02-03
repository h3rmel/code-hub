import { cn } from "@/lib/utils";

type ChatHistoryProps = {
  chatHistory: MessageEvent[];
};

export function ChatHistory({ chatHistory }: ChatHistoryProps) {
  const messages = chatHistory.map((message, index) => {
    const data = JSON.parse(message.data);

    return (
      <p
        key={index}
        className={cn(
          "w-fit",
          "bg-muted/50",
          "px-2 py-1",
          "rounded-lg rounded-bl-none"
        )}
      >
        {data.body}
      </p>
    );
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        "size-full",
        "p-4",
        "border rounded-lg"
      )}
    >
      {messages}
    </div>
  );
}
