using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using UnityEngine;

public class ScreenManager : MonoBehaviour
{
    #region Singleton

    private static ScreenManager _instance;
    public static ScreenManager Instance
    {
        get
        {
            if (_instance == null)
            {
                GameObject screenManagerObject = new GameObject("ScreenManager");
                screenManagerObject.AddComponent<ScreenManager>();
            }

            return _instance;
        }
    }

    private void Awake()
    {
        _instance = this;
    }
    #endregion

    public float rotationSpeed = 10.0f;

    private WebSocket webSocket;
    private Payload payload;

    private List<Screen> screens;
    private int screenID;

    private delegate void ScreenAction();
    private ScreenAction screenAction;
    private bool performAction = false;

    private void Start()
    {
        webSocket = new WebSocket("ws://localhost:8080");
        webSocket.Connect();
        payload = new Payload();
        screens = new List<Screen>();
        webSocket.OnMessage += WebSocket_OnMessage;
    }

    private void Update()
    {
        if(performAction)
        {
            screenAction?.Invoke();
        }
    }

    private void AddNewScreen()
    {
        performAction = false;
        Vector3 offset = Utility.ConvertToVector3(payload.vec3);
        Screen newScreen = new Screen(screenID);
        newScreen.CreateScreen(offset);

        screens.Add(newScreen);
    }

    private void RemoveScreen()
    {
        performAction = false;
        Destroy(screens.Find(x => x.screenID == screenID).screenObject);
        screens.RemoveAll(x => x.screenID == screenID);
    }

    private void TranslateScreen()
    {
        performAction = false;
        Vector3 translationDirection = Utility.ConvertToVector3(payload.vec3);
        screens.Find(x => x.screenID == screenID).Translate(translationDirection);
    }

    private void RotateScreen()
    {
        performAction = false;
        Vector3 rotatationDirection = Utility.ConvertToVector3(payload.vec3);
        screens.Find(x => x.screenID == screenID).Rotate(rotatationDirection, rotationSpeed);
    }

    private void ScaleScreen()
    {
        performAction = false;
        Vector3 scaleSize = Utility.ConvertToVector3(payload.vec3);
        screens.Find(x => x.screenID == screenID).Scale(scaleSize);
    }

    private void WebSocket_OnMessage(object sender, MessageEventArgs e)
    {
        payload = JsonUtility.FromJson<Payload>(e.Data);
        screenID = payload.screenID;

        switch (payload.type)
        {
            case "Add":
                performAction = true;
                screenAction = AddNewScreen;
                break;
            case "Remove":
                performAction = true;
                screenAction = RemoveScreen;
                break;
            case "Translate":
                performAction = true;
                screenAction = TranslateScreen;
                break;
            case "Rotate":
                performAction = true;
                screenAction = RotateScreen;
                break;
            case "Scale":
                performAction = true;
                screenAction = ScaleScreen;
                break;
        }
    }
}
