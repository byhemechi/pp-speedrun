import { type WebSocket, WebSocketServer } from "ws";
import { GameState, getState } from "./gameState";

const clients = new Map<Symbol, WebSocket>();

export async function startWebSocket() {
  const server = new WebSocketServer({ port: 38957 });

  server.on("connection", (socket) => {
    const id = Symbol("Websocket Client");
    console.log(id);
    clients.set(id, socket);
    updateState();

    socket.on("close", () => clients.delete(id));
  });

  const addr = server.address();

  console.log(
    `Server Listening on ${
      typeof addr == "string" ? addr : `${addr.address} port ${addr.port}`
    }`
  );
}

export async function updateState() {
  const state = await getState();
  for (const [id, socket] of clients) {
    console.log(id);
    socket.send(
      JSON.stringify({
        data: "state",
        state,
      })
    );
  }
}
