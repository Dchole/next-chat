import { WebSocket, WebSocketServer } from "ws";

export function createWSServer() {
  const wss = new WebSocketServer({ port: 3001 });

  wss.on("connection", ws => {
    ws.on("error", console.error);

    ws.on("message", data => {
      console.log("received: %s", data);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          try {
            const { uid, message } = JSON.parse(data.toString());
            if ([message.sender, message.receiver].includes(uid)) {
              client.send(JSON.stringify(message));
            }
          } catch (error) {
            client.send(data);
          }
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
