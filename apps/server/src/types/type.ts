export interface Player {
  id: string;
  username: string;
  moves?: Move[];
}

export interface Move {
  moveBy: Player;
  move: string;
}

export interface Room {
  roomId: string;
  players: Player[];
  moves: Move[];
}

export interface Game {
  roomId: string;
  players: Player[];
  moves: Move[];
}
