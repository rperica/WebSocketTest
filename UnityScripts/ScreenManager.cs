using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;

public class ScreenManager : MonoBehaviour
{
    #region Singleton

    private static ScreenManager _instance;
    public static ScreenManager Instance
    {
        get
        {
            if(_instance==null)
            {
                GameObject go = new GameObject("ScreenManager");
                go.AddComponent<ScreenManager>();
            }

            return _instance;
        }
    }

    private void Awake()
    {
        _instance = this;
    }
    #endregion

    private WebSocket ws;
    private List<Screen> screens;
    private int screenID;

    private bool addFlag = false;
    private bool removeFlag = false;

    private void Start()
    {
        ws = new WebSocket("ws://localhost:8080");
        ws.Connect();

        screens = new List<Screen>();
        Payload payload = new Payload();

        ws.OnMessage += (sender, e) =>
        {
            payload = JsonUtility.FromJson<Payload>(e.Data);

            screenID = payload.screenID;

            switch (payload.type)
            {
                case "Add":
                    addFlag = true;
                    break;
                case "Remove":
                    removeFlag = true; 
                    break;
            }
        };
    }

    private void Update()
    {
        if (addFlag)
            AddScreen();

        if (removeFlag)
            Remove();
    }

    private void AddScreen()
    {
        addFlag = false;
        GameObject newScreen = GameObject.CreatePrimitive(PrimitiveType.Cube);
        newScreen.transform.position = new Vector3(0.0f, 1.0f, -5.0f);
        screens.Add(new Screen(newScreen, screenID, newScreen.transform.position));
    }

    private void Remove()
    {
        removeFlag = false;
        Destroy(screens.Find(x => x.screenID == screenID).screenObject);
        screens.RemoveAll(x => x.screenID == screenID);
    }
}
