import { WebSocket, WebSocketServer } from "ws";

export function createWSServer() {
  const wss = new WebSocketServer({ port: 3001 });

  wss.on("connection", ws => {
    ws.on("error", console.error);

    ws.on("message", data => {
      console.log("received: %s", data);
      //   ws.send("back to front");
      wss.clients.forEach(function each(client) {
        console.log(client.readyState, WebSocket.OPEN);
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });
}

export function connectToWS() {
  const ws = new WebSocket("ws://localhost:3001");

  ws.on("open", () => {
    console.log("connected");
  });

  ws.on("close", () => {
    console.log("disconnected");
  });

  return ws;
}
