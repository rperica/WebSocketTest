using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class Message
{
    public double x;
    public double y;
    public double z;
}

[System.Serializable]
public class PayLoad
{
    public string type;
    public Message message;
}
