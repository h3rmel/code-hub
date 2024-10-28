import { createRoot } from "react-dom/client";
import "./assets/globals.css";
import { App } from "./app.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
