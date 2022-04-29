using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class Vec3
{
    public double x;
    public double y;
    public double z;
}

[System.Serializable]
public class Payload
{
    public int screenID;
    public string type;
    public Vec3 vec3;
}

