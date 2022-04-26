$(document).ready(function() {
    $('#addbutton').click(function() {
    	$("#select").append($('<option>', {
          	    value: ID,
                text: "Screen"+ID.toString()            
        }))

        $("#select").val(ID).change();

        AddScreen(ID);
        currentID=ID;
        ID=ID+1;
    })

    $('#deletebutton').click(function() {
        currentID=$('select').val();

        if(currentID!=null){
            console.log(currentID);
            $('#select option').each(function() {
                if ($(this).val() == currentID) {
                    $(this).remove();
                    RemoveScreen(currentID);
                    currentID=$('select').val();
                    console.log(currentID);
                }
            });
        }
        else {
            ID=0;
        }
    })

    $('#tx').on('change', function(){
        message.currentID=$('select').val();
        message.vec3.x=parseFloat($('#tx').val());
        message.vec3.y=0.0;
        message.vec3.z=0.0;

        Transform("Translate");
    })

    $('#ty').on('change', function(){
        message.currentID=$('select').val();
        message.vec3.y=parseFloat($('#ty').val());
        message.vec3.x=0.0;
        message.vec3.z=0.0;

        Transform("Translate");
    })

    $('#tz').on('change', function(){
        message.currentID=$('select').val();
        message.vec3.z=parseFloat($('#tz').val());
        message.vec3.y=0.0;
        message.vec3.x=0.0;

        Transform("Translate");
    })

    $('#rx').on('change', function(){
        message.currentID=$('select').val();
        message.vec3.x=parseFloat($('#rx').val());
        message.vec3.y=0.0;
        message.vec3.z=0.0;

        Transform("Rotate");
    })

    $('#ry').on('change', function(){
        message.currentID=$('select').val();
        message.vec3.y=parseFloat($('#ry').val());
        message.vec3.x=0.0;
        message.vec3.z=0.0;

        Transform("Rotate");
    })

    $('#rz').on('change', function(){
        message.currentID=$('select').val();
        message.vec3.z=parseFloat($('#rz').val());
        message.vec3.y=0.0;
        message.vec3.x=0.0;

        Transform("Rotate");
    })

    $('#s').on('change', function(){
        message.currentID=$('select').val();
        message.vec3.z=parseFloat($('#s').val());
        message.vec3.y=parseFloat($('#s').val());
        message.vec3.x=parseFloat($('#s').val());

        Transform("Scale");
    })
})