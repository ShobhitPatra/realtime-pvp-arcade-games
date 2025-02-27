import { Server, Socket } from "socket.io";
import { Move, Player, Room } from "../types/type";
import { stringify } from "querystring";
import { determineWinner } from "../services/gameService";

const rooms: Record<string, Room> = {};

const gameSocket = (_io: Server) => {
  _io.on("connection", (socket: Socket) => {
    console.log(`new user joined with socket_id : ${socket.id}`);

    socket.on(
      "join_room",
      ({ room_id, player }: { room_id: string; player: Player }) => {
        console.log(`player ${player} requested to join the room`);
        if (!rooms[room_id]) {
          //creating a new room
          rooms[room_id] = {
            roomId: room_id,
            players: [],
            moves: [],
          };
          console.log(`new room created ${room_id}`);
        }
        if (rooms[room_id].players.length >= 2) {
          socket.emit("room_full", { message: "room is full" });
          console.log({ message: "room is full" });

          return;
        }
        rooms[room_id].players.push(player);
        socket.join(room_id);
        console.log(`player ${player} joined the room ${room_id}`);

        _io.to(room_id).emit("updated_players", rooms[room_id].players);
      }
    );

    socket.on(
      "make_move",
      ({ room_id, move }: { room_id: string; move: Move }) => {
        rooms[room_id].moves.push(move);

        if (rooms[room_id].moves.length === 2) {
          const moveByPlayer1 = rooms[room_id].moves[0];
          const moveByPlayer2 = rooms[room_id].moves[1];

          const result = determineWinner(moveByPlayer1, moveByPlayer2);
          _io.to(room_id).emit("game_result", result);

          rooms[room_id].moves = [];
        }
      }
    );

    socket.on("disconnect", () => {
      console.log(
        `user disconnnected with socket_id : ${socket.id} disconnected`
      );

      Object.keys(rooms).forEach((room_id) => {
        rooms[room_id].players = rooms[room_id].players.filter(
          (player) => player.id !== socket.id
        );
        _io.to(room_id).emit("updated_players", rooms[room_id].players);
        console.log(`updated players : ${rooms[room_id].players}`);
      });
    });
  });
};

export default gameSocket;
