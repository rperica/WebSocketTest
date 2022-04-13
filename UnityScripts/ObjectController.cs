using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using UnityEngine;

public class ObjectController : MonoBehaviour
{
    public GameObject[] obj;
    public float rotationSpeed = 12.5f;

    private WebSocket ws;

    private bool moveEnabled=false;
    private Vector3 moveDirection;

    private bool rotationEnabled = false;
    private Vector3 rotationDirection;

    private bool scaleEnabled = false;
    private Vector3 scaleSize;
    
    private int objectIndex=0;

    private void Start()
    {
        ws = new WebSocket("ws://localhost:8080");

        ws.Connect();

        PayLoad payload = new PayLoad();

        ws.OnMessage += (sender, e) =>
        {
            payload = JsonUtility.FromJson<PayLoad>(e.Data);

            objectIndex = payload.objectID;

            switch (payload.type)
            {
                case "Movement":
                    MoveCube(payload.message);
                    break;
                case "Rotation":
                    RotateCube(payload.message);
                    break;
                case "Scale":
                    ScaleCube(payload.message);
                    break;
            }
        };
    }
    private void Update()
    {
        if(moveEnabled)
        {
            obj[objectIndex].transform.position += moveDirection;
            moveEnabled = false;
        }

        if(rotationEnabled)
        {
            obj[objectIndex].transform.Rotate(rotationDirection*rotationSpeed);
            rotationEnabled = false;
        }

        if(scaleEnabled)
        {
            obj[objectIndex].transform.localScale += scaleSize;
            scaleEnabled = false;
        }
    }
    private void MoveCube(Message msg)
    {
        moveEnabled = true;
        moveDirection = new Vector3((float) msg.x,(float) msg.y,(float) msg.z);
    }

    private void RotateCube(Message msg)
    {
        rotationEnabled = true;
        rotationDirection = new Vector3((float)msg.x, (float)msg.y, (float)msg.z);
    }

    private void ScaleCube(Message msg)
    {
        scaleEnabled = true;
        scaleSize = new Vector3((float)msg.x, (float)msg.y, (float)msg.z);
    }
}
