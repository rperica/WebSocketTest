$(document).ready(function() {
    $('#addbutton').click(function() {
    	$("#select").append($('<option>', {
          	    value: id,
                text: "Screen"+id.toString()            
        }))

        $("#select").val(id).change();

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
                    let message=new Message(currentID,"Remove");
                    message.Send();
                }
            });
        }
        else {
            id=0;
        }
    })

    $('#tx').on('change', function() {
        currentID=$('select').val();

        if(currentID!=null) {
            x=parseFloat($('#tx').val());
            let direction=new Vec3(x,0.0,0.0);
            let message=new Message(currentID,"Translate", direction);
            message.Send();
        }
    })

    $('#ty').on('change', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            y=parseFloat($('#ty').val());
            let direction=new Vec3(0.0,y,0.0);
            let message=new Message(currentID,"Translate", direction);
            message.Send();
        }
    })
            
    $('#tz').on('change', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            z=parseFloat($('#tz').val());
            let direction=new Vec3(0.0,0.0,z);
            let message=new Message(currentID,"Translate", direction);
            message.Send();
        }
    })

    $('#rx').on('change', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            x=parseFloat($('#rx').val());
            let direction=new Vec3(x,0.0,0.0);
            let message=new Message(currentID,"Rotate", direction);
            message.Send();
        }
    })

    $('#ry').on('change', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            y=parseFloat($('#ry').val());
            let direction=new Vec3(0.0,y,0.0);
            let message=new Message(currentID,"Rotate", direction);
            message.Send();
        }
    })

    $('#rz').on('change', function() {
        currentID=$('select').val(); 

        if(currentID!=null) {
            z=parseFloat($('#rz').val());
            let direction=new Vec3(0.0,0.0,z);
            let message=new Message(currentID,"Rotate", direction);
            message.Send();
        }
    })

    $('#s').on('change', function() {
        currentID=$('select').val();

        if(currentID!=null) {
            scaleValue=parseFloat($('#s').val());
            let direction=new Vec3();
            direction.SetDirection(scaleValue)
            let message=new Message(currentID,"Scale", direction);
            message.Send();
        }
    })
})