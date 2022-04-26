using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Screen
{
    public GameObject screenObject;
    public int screenID;
    public Vector3 position;

    public Screen(GameObject _screenObject, int _screenID, Vector3 _position)
    {
        screenObject = _screenObject;
        screenID = _screenID;
        position = _position;
    }
}
