const WebSocket = require("ws");

const wss = new WebSocket.Server({ port:8080}); 
const clients = new Map();

wss.on("connection", ws => {

    const clientId=Math.floor(Math.random()*100 + 1);
    clients.set(ws,clientId);

    console.log("new client connected: " + clientId);

    ws.on("message", msg => {
        console.log("Client has sent us: " + msg);
        
        let data=null;
        switch(msg.toString())
        {
            case "MoveUp":
                data=LoadJSON("Data/moveUp.json");
                BroadCastData(data);
                break;
            case "MoveDown":
                data=LoadJSON("Data/moveDown.json");
                BroadCastData(data);
                break;
            case "MoveRight":
                data=LoadJSON("Data/moveRight.json");
                BroadCastData(data);
                break;
            case "MoveLeft":
                data=LoadJSON("Data/moveLeft.json");
                BroadCastData(data);
                break;
            case "MoveForward":
                data=LoadJSON("Data/moveForward.json");
                BroadCastData(data);
                break;               
            case "MoveBackward":
                data=LoadJSON("Data/moveBackward.json");
                BroadCastData(data);
                break;  
        }
    });

    ws.on("close", () => {
        console.log("the client has disconnected");
        clients.delete(ws);
    });

    ws.onerror=function() {
        console.log("Some Error occured");
    }
});

console.log("The WebSocket server is running on port 8080");

function LoadJSON(path)
{
    const fs = require("fs");
    const rawData=fs.readFileSync(path);
    const jsonFile=JSON.parse(rawData);
    return jsonFile;
}

function BroadCastData(data)
{
    [...clients.keys()].forEach(client => {
        client.send(JSON.stringify(data));
    });
}