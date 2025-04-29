import { useEffect } from "react";
import { Socket } from "socket.io-client";
import GameState from "../interface/GameState";
import GameListener from "../GameListener";
import { setupControls } from "../Controls";

export function useGameSocket(
  socket: Socket,
  roomId: string,
  setGameState: (state: GameState) => void
) {
  useEffect(() => {
    const gameListener = new GameListener();

    const interval = setInterval(() => {
      if (socket.id) {
        setupControls(gameListener, socket, roomId, socket.id);
        clearInterval(interval);
      }
    }, 100);

    socket.emit("joinRoom", roomId, (room: any) => {
      console.log("Joined room:", room);
    });

    socket.on("gameState", (newState: GameState) => {
      if (newState.gameStarted) gameListener.start();
      setGameState(newState);
    });

    return () => {
      socket.off("gameState");
      gameListener.stop();
    };
  }, [roomId, socket, setGameState]);
}
