$(document).ready(function() {
    $('#addbutton').click(function() {
    	$("#select").append($('<option>', {
          	    value: id,
                text: "Screen"+id.toString()            
        }))

        $("#select").val(id).change();
        ResetSlider();

        let message=new Message(id,"Add");
        message.Send();

       id++;
    })

    $('#deletebutton').click(function() {
        currentID=$('select').val();

        if(currentID!=null) {
            console.log(currentID);
            $('#select option').each(function() {
                if ($(this).val() == currentID) {
                    $(this).remove();
                    ResetSlider();
                    let message=new Message(currentID,"Remove");
                    message.Send();
                }
            });
        }
        else {
            id=0;
        }
    })

    $('#select').on('change', function() {
        ResetSlider();
    })

    let prevtx=0;
    $('#tx').on('input', function() {
        currentID=$('select').val();

        if(currentID!=null) {
            x=parseFloat($('#tx').val());
            x=SliderDirection(prevtx,x,0.5);
            let direction=new Vec3(x,0.0,0.0);
            let message=new Message(currentID,"Translate", direction);
            message.Send();
        }
        prevtx=parseFloat($('#tx').val());
    })

    let prevty=0;
    $('#ty').on('input', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            y=parseFloat($('#ty').val());
            y=SliderDirection(prevty,y,0.5);
            let direction=new Vec3(0.0,y,0.0);
            let message=new Message(currentID,"Translate", direction);
            message.Send();
        }
        prevty=parseFloat($('#ty').val());
    })
      
    prevtz=0;
    $('#tz').on('input', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            z=parseFloat($('#tz').val());
            z=SliderDirection(prevtz,z,0.5);
            let direction=new Vec3(0.0,0.0,z);
            let message=new Message(currentID,"Translate", direction);
            message.Send();
        }
        prevtz=parseFloat($('#tz').val());
    })

    prevrx=0;
    $('#rx').on('input', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            x=parseFloat($('#rx').val());
            x=SliderDirection(prevrx,x,0.5);
            let direction=new Vec3(x,0.0,0.0);
            let message=new Message(currentID,"Rotate", direction);
            message.Send();
        }
        prevrx=parseFloat($('#rx').val());
    })

    prevry=0;
    $('#ry').on('input', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            y=parseFloat($('#ry').val());
            y=SliderDirection(prevry,y,0.5);
            let direction=new Vec3(0.0,y,0.0);
            let message=new Message(currentID,"Rotate", direction);
            message.Send();
        }
        prevry=parseFloat($('#ry').val());
    })

    prevrz=0;
    $('#rz').on('input', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            z=parseFloat($('#rz').val());
            z=SliderDirection(prevrz,z,0.5);
            let direction=new Vec3(0.0,0.0,z);
            let message=new Message(currentID,"Rotate", direction);
            message.Send();
        }
        prevrz=parseFloat($('#rz').val());
    })

    prevs=0;
    $('#s').on('input', function() {
        currentID=$('select').val();

        if(currentID!=null) {
            scaleValue=parseFloat($('#s').val());
            scaleValue=SliderDirection(prevs,scaleValue,0.5);
            let direction=new Vec3();
            direction.SetDirection(scaleValue)
            let message=new Message(currentID,"Scale", direction);
            message.Send();
        }
        prevs=parseFloat($('#s').val());
    })
})

function ResetSlider()
{
    $('.slider').val(0);
}

// Increase/decrease step value depending on sliding direction
function SliderDirection(prev,current,step)
{
    if(current>0)
    {
        if(Math.abs(prev)>Math.abs(current))
            return -step;
        else
            return step;
    }
    else if(current<0)
    {
        if(Math.abs(prev)>Math.abs(current))
            return step;
        else
            return -step;
    }
    else
    {
        if(prev>0)
            return -step;
        else
            return step;
    }
}
