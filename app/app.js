const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected");
});

ws.onmessage=(WebSocketMessage) => {
    const data=JSON.parse(WebSocketMessage.data);
    console.log("Message from " + ws.url + " is " + data.type);
};

id=0;