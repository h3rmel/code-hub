import { createRoot } from "react-dom/client";
import { App } from "@/app";

import "@/assets/globals.css";

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
