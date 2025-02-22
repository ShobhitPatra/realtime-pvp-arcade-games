import { Move } from "../types/type";

export const determineWinner = (move1: Move, move2: Move) => {
  if (move1.move === move2.move) {
    return { result: "draw" };
  }
  if (
    (move1.move === "rock" && move2.move === "scissors") ||
    (move1.move === "scissors" && move2.move === "paper") ||
    (move1.move === "paper" && move2.move === "rock")
  ) {
    return { winner: move1.moveBy };
  } else {
    return { winner: move2.moveBy };
  }
};
