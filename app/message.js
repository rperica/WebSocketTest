class Message 
{
    constructor(screenID=0, type="empty", vec3=null)
    {
        this.screenID=screenID;
        this.type=type;
        this.vec3=vec3;
    }

    Send()
    {
        const json=JSON.stringify(this);
        ws.send(json);
    }
}

class Vec3
{
    constructor(x=0.0,y=0.0,z=0.0)
    {
        this.x=x;
        this.y=y;
        this.z=z;
    }
    
    SetDirection(value)
    {
        this.x=value;
        this.y=value;
        this.z=value;
    }
}