using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Utility
{
    public static Vector3 ConvertToVector3(Vec3 vector)
    {
        return new Vector3((float)vector.x, (float)vector.y, (float)vector.z);
    }
}
