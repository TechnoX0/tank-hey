import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import App from "./pages/App.tsx";
import Game from "./pages/Game.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/game" element={<Game />} />
                <Route path="/game/:roomId" element={<Game />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
