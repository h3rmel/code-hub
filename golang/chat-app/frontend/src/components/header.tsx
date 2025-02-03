import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className={cn("relative", "border-b", "backdrop-blur-md")}>
      <nav className={cn("max-w-7xl h-20", "mx-auto p-4", "border-x")}>
        <ThemeToggle className={cn("absolute top-1/2 -translate-y-1/2")} />
        <h1 className={cn("text-center text-2xl")}>Realtime Chat App</h1>
      </nav>
    </header>
  );
}
