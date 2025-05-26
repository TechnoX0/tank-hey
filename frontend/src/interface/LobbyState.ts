import Player from "./Player";

export interface LobbyState {
  id: string;
  name: string;
  ownerId: string;
  players: Record<string, Player>;
}
