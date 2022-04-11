using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using UnityEngine;

public class ObjectController : MonoBehaviour
{
    public GameObject obj;

    private WebSocket ws;

    private bool moveEnabled=false;
    private Vector3 moveDirection;

    private void Start()
    {
        ws = new WebSocket("ws://localhost:8080");

        ws.Connect();

        PayLoad payload = new PayLoad();

        ws.OnMessage += (sender, e) =>
        {
            payload = JsonUtility.FromJson<PayLoad>(e.Data);

            switch (payload.type)
            {
                case "Movement":
                    MoveObject(payload.message);
                    break;
            }
        };
    }
    private void Update()
    {
        if(moveEnabled)
        {
            obj.transform.position += moveDirection;
            moveEnabled = false;
        }
    }
    private void MoveObject(Message msg)
    {
        moveEnabled = true;
        moveDirection = new Vector3((float) msg.x,(float) msg.y,(float) msg.z);
    }
}
