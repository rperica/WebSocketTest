const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected");
});

ws.onmessage=(WebSocketMessage) => {
    const data=JSON.parse(WebSocketMessage.data);
    console.log("Message from " + ws.url + " is " + data.type);
};

let ID = 0;
let currentID=0;

//Object
let message=new Object();
message.screenID=0;
message.type="Empty";
message.vec3=new Object();
message.vec3.x=0.0;
message.vec3.y=0.0;
message.vec3.z=0.0;

function AddScreen(currentID)
{
    message.screenID=currentID;
    message.type="Add";
    const json=JSON.stringify(message);
    ws.send(json);
}

function RemoveScreen(currentID)
{
    message.screenID=currentID;
    message.type="Remove";
    const json=JSON.stringify(message);
    ws.send(json);
}

function Transform(type)
{
    message.type=type;
    const json=JSON.stringify(message);
    ws.send(json);
}