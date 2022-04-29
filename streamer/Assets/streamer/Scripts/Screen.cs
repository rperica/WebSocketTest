using System.Collections;
using System.Collections.Generic;
using Microsoft.MixedReality.Toolkit.Utilities.Solvers;
using UnityEngine;

public class Screen
{
    public GameObject screenObject;
    public int screenID;
    public Vector3 position;
    public Orbital objectOrbital;
   
    public Screen(int _screenID)
    {
        screenObject = null;
        screenID = _screenID;
        position = Vector3.zero;
    }

    public Screen(GameObject _screenObject, int _screenID, Vector3 _position)
    {
        screenObject = _screenObject;
        screenID = _screenID;
        position = _position;
    }

    public void CreateScreen(Vector3 offset)
    {
        screenObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
        screenObject.AddComponent<Orbital>();
        objectOrbital = screenObject.GetComponent<Orbital>();

        objectOrbital.AddOffset(offset);
    }

    public void Translate(Vector3 translateDirection)
    {
        objectOrbital.LocalOffset += translateDirection;
    }

    public void Rotate(Vector3 rotationDirection, float rotationSpeed)
    {
        screenObject.transform.Rotate(rotationDirection * rotationSpeed);
    }

    public void Scale(Vector3 scaleSize)
    {
        screenObject.transform.localScale += scaleSize;
    }
}

