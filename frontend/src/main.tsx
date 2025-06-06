import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import Game from "./pages/Game.tsx";
// import Lobby from "./pages/Lobby.tsx";
// import TankSelection from "./pages/TankSelection.tsx";
import MainMenu from "./pages/MainMenu.tsx";
import Credits from "./pages/Credits.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainMenu />} />
                <Route path="/game" element={<Game />} />
                <Route path="/game/:roomId" element={<Game />} />
                {/* <Route path="/gamelobby" element={<Lobby />} /> */}
                {/* <Route path="/gameselection" element={<TankSelection />} /> */}
                {/* <Route path="/mainmenu" element={<MainMenu />} /> */}
                {/* <Route path="/settings" element={<Settings />} /> */}
                <Route path="/credits" element={<Credits />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
