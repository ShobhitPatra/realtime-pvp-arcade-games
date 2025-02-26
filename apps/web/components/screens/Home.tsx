"use client";

import { useEffect, useState } from "react";
import socket from "../../utils/socket";
// import { io } from "socket.io-client";

const Home = () => {
  const [gameresult, setGameresult] = useState("");
  const [username, setUsername] = useState<string>("");
  const [playersOnline, setPlayersOnline] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<string>("room@123");

  useEffect(() => {
    // const socket = io("http://localhost:8000");
    socket.on("updated_players", (players) => {
      setPlayersOnline(
        players.map((player: { username: string }) => player.username)
      );
    });
  }, []);

  socket.on("game_result", (result: { winner: string }) => {
    setGameresult(result.winner);
  });
  //join_game handler
  const joinRoom = ({
    roomId,
    player,
  }: {
    roomId: string;
    player: {
      id?: string;
      username: string;
    };
  }) => {
    socket.emit("join_room", { room_id: roomId, player });
  };

  // make_move handler
  const makeMove = ({
    roomId,
    move,
  }: {
    roomId: string;
    move: { moveBy: string; move: string };
  }) => {
    socket.emit("make_move", { room_id: roomId, move });
  };
  return (
    <div className="bg-slate-800 h-screen text-white flex-col gap-10">
      {/* start game button  */}
      <div className="flex gap-4 justify-center p-20">
        <label className="flex items-center">
          <h3 className="font-bold text-xl">username</h3>
        </label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="text-black bg-white p-3 rounded-md"
        />

        <button
          className="bg-green-800 p-3  text-2xl rounded-md hover:bg-green-700"
          onClick={() =>
            joinRoom({ roomId, player: { id: "1", username: username } })
          }
        >
          Start Game
        </button>
      </div>
      {/* game variables */}
      <ul className=" flex justify-center gap-8 p-20">
        <li
          className="p-6 bg-green-500 hover:bg-green-400 rounded-md font-bold text-slate-950"
          onClick={() =>
            makeMove({
              roomId,
              move: { moveBy: "player1", move: "rock" },
            })
          }
        >
          ROCK
        </li>
        <li
          className="p-6 bg-red-500 hover:bg-red-400 rounded-md font-bold text-slate-950"
          onClick={() =>
            makeMove({
              roomId,
              move: { moveBy: "player1", move: "paper" },
            })
          }
        >
          PAPER
        </li>
        <li
          className="p-6 bg-yellow-500 hover:bg-yellow-400 rounded-md font-bold text-slate-950"
          onClick={() =>
            makeMove({
              roomId,
              move: { moveBy: "player1", move: "scissor" },
            })
          }
        >
          SCISSOR
        </li>
      </ul>
      {/* game result */}
      <div className="flex justify-center p-20">PLayers :</div>
      {!playersOnline ? <p>No players yet...</p> : <p>{playersOnline}</p>}
      <div className="flex justify-center p-20">Result : {gameresult}</div>
    </div>
  );
};

export default Home;
