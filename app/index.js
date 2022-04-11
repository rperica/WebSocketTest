const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected");
    ws.send("How are you?");
});

ws.onmessage=(WebSocketMessage) => {
    const data=JSON.parse(WebSocketMessage.data);
    console.log("Message from " + ws.url + " is " + data.type);
};

function MoveUp()
{  
    ws.send("MoveUp");
}

function MoveDown()
{
    ws.send("MoveDown");
}

function MoveRight()
{
    ws.send("MoveRight");
}

function MoveLeft()
{
    ws.send("MoveLeft");
}

function MoveForward()
{
    ws.send("MoveForward");
}

function MoveBackward()
{
    ws.send("MoveBackward");
}