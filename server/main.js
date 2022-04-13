const WebSocket = require("ws");

const wss = new WebSocket.Server({ port:8080})
{
    console.log("The WebSocket server is running on port 8080");
}; 

const clients = new Map();

wss.on("connection", ws => {

    const clientId=Math.floor(Math.random()*100 + 1);
    clients.set(ws,clientId);

    console.log("new client connected: " + clientId);

    ws.on("message", msg => {
        console.log("Client has sent us: " + msg); 
        BroadCastData(msg);
    });

    ws.on("close", () => {
        console.log("the client has disconnected");
        clients.delete(ws);
    });

    ws.onerror=function() {
        console.log("Some Error occured");
    }
});

function BroadCastData(data)
{
    let message=JSON.parse(data);
    
    [...clients.keys()].forEach(client => {
        client.send(JSON.stringify(message));
    });
}