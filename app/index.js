const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected");
});

ws.onmessage=(WebSocketMessage) => {
    const data=JSON.parse(WebSocketMessage.data);
    console.log("Message from " + ws.url + " is " + data.type);
};

function Transform(type,x,y,z)
{  
    information.type=type;

    information.message.x=x;
    information.message.y=y;
    information.message.z=z;

    const json=JSON.stringify(information);
    ws.send(json);

    console.log(information);
    console.log(json);
}

function SelectCube(ID)
{
   information.objectID=ID;
}

let information=new Object();
information.objectID=0;
information.type="Empty";

information.message=new Object();
information.message.x=0.0;
information.message.y=0.0;
information.message.z=0.0;